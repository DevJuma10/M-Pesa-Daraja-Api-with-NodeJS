import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
dotenv.config()

const app = express();
const PORT = process.env.PORT

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',  (req,res)=>{
    res.send('Safaricom Daraja Api Tinkering ')
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});