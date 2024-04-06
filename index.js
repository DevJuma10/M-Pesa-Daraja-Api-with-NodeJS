import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
dotenv.config()
import authRouter from './routes/auth.js'
import createToken from './middlewares/createToken.js';

const app = express();
const PORT = process.env.PORT
app.use(cors())

//Auth middleware
app.use(createToken)

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',  (req,res)=>{
    res.send('Safaricom Daraja Api Tinkering ')
})

// Mount the router at '/api'
app.use('/auth', authRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});