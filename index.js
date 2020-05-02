let server = require('./server');
let config = require("./config/config.js");
const api_version = config.get_api_version;


// ** API ROUTES
server.use(api_version, require('./modules/main'));


server.listen(config.get_app_port, function () {
    console.log(`${config.get_app_name} listening at ${config.get_app_port}`);
});