const fs=require('fs');
const requestHandler = (request, response) => {
    const url=request.url;
    const method=request.method;
    if(url === '/')
    {
        fs.readFile('message.text', {encoding:'utf-8'}, (err, data) => {
        if(err)
        {
            console.log(err);
            response.statusCode = 500; // Internal Server Error
        response.end('An error occurred');
        }
        else
        {
        response.setHeader('Content-Type','text/html');
        response.write('<html>');
        response.write('<head><title>Form</title></head>');
        response.write('<body>');
        response.write(data);
        response.write('<form action="/message" method="POST"><input type="text" name="message"><button>Submit</button></form>');
        response.write('</body>');
        response.write('</html');
       response.end();
        }
        });
    }

    else if(url === '/message' && method === 'POST')
    {
        const body=[];
        request.on('data', (chunks) => {
        body.push(chunks);
        })
        return request.on('end', () => {
        const parsedBody=Buffer.concat(body).toString();
        const message=parsedBody.split('=')[0];
        fs.writeFile('message.text', message, (err) => {
        if(err)
        {
            console.log(err);
            response.statusCode = 500;
          response.end('An error occurred');
        }
    else
    {
        console.log(message);
        response.statusCode=302;
        response.setHeader('Location','/');
        response.end();
    }
    });
});
    }

    else
    {
    response.setHeader('Content-Type','text/html');
    response.write('<html>');
    response.write('<head><title>Message</title></head>');
    response.write('<body><h1>Node.js</h1></body>');
    response.write('</html');
    response.end();
    }
}
module.exports=requestHandler;