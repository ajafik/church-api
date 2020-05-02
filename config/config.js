var config = require("./config.json");
class Config {

    //API SETTINGS
    static get get_app_name() {
        return config.app_name;
    }

    static get get_app_port() {
        return config.port;
    }

    static get get_app_version() {
        return config.app_version;
    }

    static get get_api_version() {
        return config.api_version || "/v1/api";
    }
}

module.exports = Config;