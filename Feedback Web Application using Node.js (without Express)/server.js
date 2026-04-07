// Import core modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const EventEmitter = require('events');

// Create EventEmitter instance
const eventEmitter = new EventEmitter();

// Custom event listener
eventEmitter.on('feedbackSubmitted', () => {
    console.log('Event Triggered: Feedback Submitted Successfully');
});

// Create HTTP server
const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Set header
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Home route
    if (pathname === '/' && method === 'GET') {
        res.write('<h1>Welcome to Feedback Management System</h1>');
        res.end();
    }

    // Feedback form route
    else if (pathname === '/feedback' && method === 'GET') {
        fs.readFile('feedback.html', (err, data) => {
            if (err) {
                res.write('Error loading form');
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    }

    // Contact route
    else if (pathname === '/contact' && method === 'GET') {
        res.write('<h1>Contact Us</h1>');
        res.write('<p>Email: support@example.com</p>');
        res.end();
    }

    // GET request handling (search)
    else if (pathname === '/search' && method === 'GET') {
        const topic = parsedUrl.query.topic;
        res.write(`<h1>You searched for: ${topic}</h1>`);
        res.end();
    }

    // POST request handling
    else if (pathname === '/submit' && method === 'POST') {

        let body = '';

        // Non-blocking demo
        console.log('Receiving data...');

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            console.log('Processing complete');

            const params = new URLSearchParams(body);

            const name = params.get('name');
            const email = params.get('email');
            const rating = params.get('rating');
            const comments = params.get('comments');

            // Trigger event
            eventEmitter.emit('feedbackSubmitted');

            // Response
            res.write(`<h1>Thank you ${name} for your feedback!</h1>`);
            res.write(`<p>Email: ${email}</p>`);
            res.write(`<p>Rating: ${rating}</p>`);
            res.write(`<p>Comments: ${comments}</p>`);
            res.end();
        });
    }

    // 404 route
    else {
        res.write('<h1>404 - Page Not Found</h1>');
        res.end();
    }
});

// Start server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});