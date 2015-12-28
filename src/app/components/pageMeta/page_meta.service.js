(function() {
  'use strict';
  //
  // should look at http://www.iacquire.com/blog/18-meta-tags-every-webpage-should-have-in-2013
  //
  angular
    .module('runway')
    .service('PageMetaService', ['HiveEmpireConf',
    function (HiveEmpireConf) {

      var meta_data = {
        'title': 'HiveEmpire - App', // default
      };

      return {
        meta: function() {
          return meta_data;
        },
        getMeta: function( name ) {
          //console.log(name + '='+ meta_data[name])
          return meta_data[name] || '';
        },
        setMeta: function(meta_name, meta_value) {
          //console.log(meta_name +' = '+ meta_value)
          meta_data[meta_name] = meta_value;
        }
      };

    }]);

})();
