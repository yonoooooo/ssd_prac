// === TOOLS ===:
const express = require('express');                 // Web framework for Node.js
const bodyParser = require('body-parser');          // Bodyparser middleware for parsing request bodies
const path = require('path');                       // Module for handling file and directory paths

const app = express();                              // Create an Express application

// === MIDDLEWARE ===: 
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies (form submissions)
app.use(express.static(path.join(__dirname, 'public')));


// === TOOLS ===:
const { isPasswordValid, isCommonPassword } = require('./utils/pwd_functions');





// ======== ROUTES ========

// Index 
app.get('/', (req, res) => {
  res.send(`
    <h1>Enter Your Info</h1>
    <form method="POST" action="/page1_submit">
      <label>Password:</label><br/>
      <input type="password" name="password" required /><br/><br/>
      <button type="submit">Submit Password</button>
    </form>
  `);
});

// POST route: handle form submission
app.post('/page1_submit', (req, res) => {

  // Extract Password from the request body
  const {password} = req.body; 

  // IF: Password Valid && Not Common
  if (isPasswordValid(password) && !isCommonPassword(password)) {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Welcome!</title></head>
        <body>
          <h1>Welcome!</h1>
          <p>Your password: <strong>${password}</strong></p>
          <form action="/logout" method="get">
            <button type="submit">Logout</button>
          </form>
        </body>
      </html>
    `);
  } 
  // ELSE: PASSWORD IS UNCOMMON
  else {
    res.redirect('/');
  }
});




// LOGOUT
app.get('/logout', (req, res) => {
  res.redirect('/');
});



// === SERVER ===:
const PORT = 80; // Define the port to listen on
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on 0.0.0.0:${PORT}`);
});
