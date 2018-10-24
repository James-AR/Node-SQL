const express = require('express');
const helmet = require('helmet');

const server = express()

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Homepage')
})

server.listen(9000, () => console.log('\nAPI is running on 9000\n'))