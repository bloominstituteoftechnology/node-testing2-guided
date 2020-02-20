require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 5000;

if(!module.parent) {
    server.listen(port, () => 
        console.log(`\n** server up on port ${port} **\n`));
}

module.exports = server;