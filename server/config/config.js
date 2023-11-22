require('dotenv').config();

const config = {
    // Server Configuration
    server: {
        port: process.env.PORT || 4000
    },

    // MongoDB Configuration
    mongo_connection: {
        uri: process.env.MONGODB_URI || 'undefined_connection'
    },

    jwt_secrets: process.env.JWT_SECRET
};

module.exports = config;