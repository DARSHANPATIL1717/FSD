const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Custom Middleware (Logging)
app.use((req, res, next) => {
  console.log(`${req.method} request received for ${req.url} at ${new Date().toLocaleTimeString()}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/about', (req, res) => {
  res.render('about');
});

// URL Parameter
app.get('/student/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Welcome ${name} to the Student Portal`);
});

// Form Submission
app.post('/submit', (req, res) => {
  const { name, email, course, age } = req.body;

  res.render('result', {
    name,
    email,
    course,
    age
  });
});

// Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});