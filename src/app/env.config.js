angular.module("HiveEmpire.config", [])

.constant("HiveEmpireConf", {
	"ENV": "staging",
	"DEBUG": false,
	"APPLICATION_ID": 1,
	"DEFAULT_ITEMS_PER_PAGE": 25,
	"API_ENDPOINTS": {
		"default": "http://api.hive-empire.com",
		"auth": "http://api.hive-empire.com"
	},
	"OPENWEATHERMAP_KEY": "64c40382be6874babf1a82de71eaf1e8",
	"OAUTH_TOKENS": {
		"facebook": {
			"KEY": "",
			"CALLBACK_URL": "",
			"REDIRECT_URL": ""
		},
		"google": {
			"KEY": "",
			"CALLBACK_URL": "",
			"REDIRECT_URL": ""
		}
	}
})

;