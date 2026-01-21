const express = require('express');
const app = express();
const {connectDB} = require('./config/database.js');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

connectDB();

const userRoutes = require('./routes/User.js');
app.use('/api/v1',userRoutes);

app.get('/',(req,res)=>{
    res.send(`<h1>Hello Yara</h1>`)
});

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})