const http=require('http');
const routes=require('./ifs');
const server=http.createServer(routes);
server.listen(3000);