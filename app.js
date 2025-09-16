const express = require('express');
const sequelize = require('./models');

// ==Global Variables==
const PORT = 3000;

// ==Setup==
const app = express();

// Connection to DB
const connectDb = async () => {
    console.log('Checking db connection...');

    try{
        console.log('Dd connection set!');
    }catch(e){
        console.log('Db connection failed.', e);
        process.exit(1);
    }
}

// ==Middleware==
app.get('/hello', (req, res, next) => {
    res.send('Hello world!');
});

// ==Start server==
(async () => {
    await connectDb();
    app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Running server on port ${PORT}.`);
});
})();