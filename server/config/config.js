const _ = require('lodash');

const config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3001,
    // expireTime: 24 * 60 * 1000,
    secrets: {
        jwt: process.env.JWT || 'yoursalary'
    }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
try{
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};
} catch (e){
    envConfig = {};
}

//merge the two config files together depending on which env you're in
module.exports = _.merge(config, envConfig);