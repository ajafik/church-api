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
        return config.api_version;
    }

    static get get_connection_string_postgres() {
        return config.database_url;
    }

    static get database_dialet() {
        return config.db_dialect;
    }
}

module.exports = Config;