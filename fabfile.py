# -*- coding: utf-8 -*-
from fabric.api import env, task, runs_once, local, prompt, run, put, sudo
from fabric.contrib.project import rsync_project
from termcolor import colored
from exceptions import BaseException

import os
import config
import shutil

TRUTHY = ['true', 't', 'y', 'yes', '1', 1]
FALSEY = ['false', 'f', 'n', 'no', '0', 0]

env.DEBUG = False
env.project = 'hiveempire-app'
env.use_ssh_config = True
env.disable_known_hosts = True

env.environment = 'local'
env.environment_class = 'development'
env.local_project_root = os.path.abspath('.')
env.dist_root = os.path.join(env.local_project_root, 'dist')
# All of our existing products


class MissingPathException(BaseException):
    message = 'Path not found'


class DontBeStillEnvironmentException(BaseException):
    message = 'Dont be stilly that environment does not exist'


class FileAlreadyExistsException(BaseException):
    message = 'File already exists'

# ------------------------------------
# ENVIRONMENTS
# ------------------------------------


@task
def DEBUG(value=True):
    env.DEBUG = value in TRUTHY
    color = 'green' if env.DEBUG is True else 'red'
    print(colored('DEBUG is %s' % env.DEBUG, color))


@task
def production():
    from config.environments import production

    env.application_user = env.user = 'ubuntu'

    env.hosts = production.HOSTS if not env.hosts else env.hosts

    env.environment = 'production'
    env.environment_class = 'production'

    env.remote_project_path = '/home/ubuntu/apps/hiveempire-app/current'
    env.remote_versions_path = '/home/ubuntu/apps/hiveempire-app/releases'
    env.deploy_archive_path = '/home/ubuntu/apps/hiveempire-app'


@task
def staging():
    from config.environments import staging

    env.application_user = env.user = 'ubuntu'

    env.hosts = staging.HOSTS if not env.hosts else env.hosts

    env.environment = 'staging'
    env.environment_class = 'staging'

    env.remote_project_path = '/home/ubuntu/apps/hiveempire-app/current'
    env.remote_versions_path = '/home/ubuntu/apps/hiveempire-app/versions'
    env.deploy_archive_path = '/home/ubuntu/apps/hiveempire-app'

# ------------------------------------
# Helper Methods
# ------------------------------------


def git_sha():
    return local('git rev-parse --short --verify HEAD', capture=True)


def git_branch():
    return local('git rev-parse --abbrev-ref HEAD', capture=True)


def project_path(*args):
    path = os.path.normpath(os.path.join(env.path_to_products, *args))
    if not os.path.isfile(path) and not os.path.isdir(path):
        msg = 'No file found at {path}'.format(path=path)
        print(colored(msg, 'red'))
        raise MissingPathException(msg)
    return path


def proceed(msg='Proceed? (y,n)', color='yellow', default='y'):
    return prompt(colored(msg, color), default=default)


# ------------------------------------
# Deploy & Action methods
# ------------------------------------

@task
def clean_versions(delete=False, except_latest=3):
    current_version = git_sha()
    #
    # cd into the path so we can use xargs
    # tail the list except the lastest N
    # exclude the known current version
    #
    cmd = "cd {path};ls -t1 {path} | tail -n+{except_latest} | grep -v '{current_version}'".format(path=env.remote_versions_path, except_latest=except_latest, current_version=current_version)
    #
    # optionally delete them
    #
    if delete in TRUTHY:
        cmd = cmd + ' | xargs rm -Rf'

    run(cmd)


@task
def projects(*args):
    if len(args) > 0:
        env.projects = args
    print(colored('env.projects set to: {projects}'.format(projects=env.projects), 'green'))


@task
def git_ensure(project, branch='master', source='origin'):
    local('cd {project_path};git co .'.format(project_path=project_path(project)), capture=True)
    local('cd {project_path};git co {branch};git pull {source} {branch}'.format(project_path=project_path(project), branch=branch, source=source), capture=True)

@task
def restart_nginx(soft=True):
    sudo('service nginx %s' % 'reload' if soft is True else 'restart')


@task
def copy_confs():
    # config
    put(local_path='./config/environments/%s/hiveempire-app-nginx'% (env.environment), remote_path='/etc/nginx/sites-available/', use_glob=False, use_sudo=True)  # nginx
    sudo('unlink {target_path}; ln -s {nginx_site_path} {target_path}'.format(nginx_site_path='/etc/nginx/sites-available/hiveempire-app-nginx', target_path='/etc/nginx/sites-enabled/hiveempire-app-nginx'))
    sudo('service nginx configtest')
    sudo('service nginx reload')

@task
def chown():
    target_path = os.path.join(env.remote_versions_path, git_sha())
    run('chown -R {name}:{name} {path}'.format(name=env.application_user, path=target_path))
    run('chmod -R 755 {path}'.format(name=env.application_user, path=target_path))


@task
def provision():
    put(local_path='./provision.sh', remote_path='~/provision.sh', use_glob=False)
    run('chmod u+x provision.sh')
    run('~/provision.sh')


@task
@runs_once
def gulp_build():
    local('gulp {environment_class} build'.format(environment_class=env.environment_class))

@task
@runs_once
def remove_dist():
    if os.path.exists(env.dist_root):
        shutil.rmtree(env.dist_root)

@task
def deploy():
    remove_dist()
    source_path = os.path.join(env.dist_root, '*')
    target_path = os.path.join(env.remote_versions_path, git_sha())
    #local('bower install')
    gulp_build()
    run('mkdir -p {target_path}'.format(target_path=target_path))
    rsync_project(local_dir=source_path, remote_dir=target_path, exclude='.git')
    chown()
#    provision()
    copy_confs()
    run('unlink {project_path}; ln -s {target_path} {project_path}'.format(project_path=env.remote_project_path, target_path=target_path))
    restart_nginx()
