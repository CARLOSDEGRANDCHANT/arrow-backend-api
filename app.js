const express = require('express');
// Local imports
const sequelize = require('./models');
const authRouter = require('./routes/auth');


// ==Global Variables==
const PORT = 3000;


// ==Setup==
const app = express();


// ==Middleware==
app.use(express.json());
// Auth Routes
app.use(authRouter);


// ==Connection to DB==
const connectDb = async () => {
    console.log('Checking db connection...');
    try{
        console.log('Dd connection set!');
    }catch(e){
        console.log('Db connection failed.', e);
        process.exit(1);
    }
}


// ==Start server==
(async () => {
    await connectDb();
    app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Running server on port ${PORT}.`);
});
})();