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

    // Add other configurations as needed
};

module.exports = config;