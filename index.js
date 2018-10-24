const express = require('express');
const helmet = require('helmet');

const zoosRoutes = require('./zoos/zoosRouter.js')

const server = express()

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Homepage')
})

server.use('/api/zoos', zoosRoutes)

server.listen(9000, () => console.log('\nAPI is running on 9000\n'))