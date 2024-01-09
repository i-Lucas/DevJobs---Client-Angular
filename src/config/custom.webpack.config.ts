const dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
        new dotenv({
            // systemvars: true,
        }),
    ],
};