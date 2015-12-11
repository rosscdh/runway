angular.module("HiveEmpire.config", [])

.constant("HiveEmpireConf", {
	"ENV": "development",
	"APPLICATION_ID": 1,
	"DEFAULT_ITEMS_PER_PAGE": 25,
	"API_ENDPOINTS": {
		"default": "http://localhost:8008"
	},
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