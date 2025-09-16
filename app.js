const express = require('express');

// Global Variables
const PORT = 3000;

// Setup
const app = express();
app.get('/hello', (req, res, next) => {
    res.send('Hello world!');
})

// Start server
app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Running server on port ${PORT}.`);
});