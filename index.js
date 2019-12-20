require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));



//npm i -D jest supertest

//jest --init or add in package.json  ->
//    "jest": {
//      "testEnvironment": "node"
//    }

//npm i pg