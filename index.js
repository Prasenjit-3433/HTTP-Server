const http = require('http');

const PORT = 3000;

// server is an event-emitter
const server = http.createServer();

const friends = [
    {
        id: 0,
        name: 'Nicola Tesla'
    },
    {
        id: 1,
        name: 'Sir Issac Newton'
    },
    {
        id: 2,
        name: 'Albert Einstein'
    }
]

// req --> is a readable stream & res --> is a writable stream
server.on('request', (req, res) => {
    const items = req.url.split('/');

    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            console.log('Request: ', friend);
            friends.push(JSON.parse(friend));
        });
        req.pipe(res);

    } else if (req.method === 'GET' && items[1] === 'friends') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        
        if(items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
    
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Issac!</li>');
        res.write('<li>What are your thoughts on astronomy?</li>');
        res.write('<ul>');
        res.write('</body>');
        res.write('</html>');

        res.end();
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found!')
    }
});

// The port the server is going to be listening on
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
