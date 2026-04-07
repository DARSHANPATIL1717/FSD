// Import required core modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const EventEmitter = require('events');

// Create custom event emitter
const eventEmitter = new EventEmitter();

// Define event listener
eventEmitter.on('studentRegistered', (name) => {
    console.log(`Event Triggered: Student Registered -> ${name}`);
});

// Create server
const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Set default header
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Routing
    if (pathname === '/' && method === 'GET') {
        res.write('<h1>Welcome to Student Information System (Node.js Server)</h1>');
        res.end();
    }

    else if (pathname === '/about' && method === 'GET') {
        res.write('<h1>About Node.js</h1>');
        res.write('<p>Node.js is a runtime environment that allows JavaScript to run on the server side.</p>');
        res.end();
    }

    // Serve form page
    else if (pathname === '/student' && method === 'GET') {

        // If query params exist → GET handling
        if (parsedUrl.query.name && parsedUrl.query.age) {
            res.write(`<h1>Student Details</h1>`);
            res.write(`<p>Name: ${parsedUrl.query.name}</p>`);
            res.write(`<p>Age: ${parsedUrl.query.age}</p>`);
            res.end();
        } else {
            // Serve HTML form
            fs.readFile('form.html', (err, data) => {
                if (err) {
                    res.write('Error loading form');
                    res.end();
                } else {
                    res.write(data);
                    res.end();
                }
            });
        }
    }

    // POST request handling
    else if (pathname === '/submit' && method === 'POST') {

        let body = '';

        // Receive data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // When data complete
        req.on('end', () => {

            const params = new URLSearchParams(body);
            const name = params.get('name');
            const age = params.get('age');

            // Trigger custom event
            eventEmitter.emit('studentRegistered', name);

            res.write(`<h1>Student Registered Successfully</h1>`);
            res.write(`<p>Name: ${name}</p>`);
            res.write(`<p>Age: ${age}</p>`);
            res.end();
        });
    }

    else {
        res.write('<h1>404 - Page Not Found</h1>');
        res.end();
    }
});

// Start server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});