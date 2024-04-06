import express from 'express';
import unirest from 'unirest';

const router = express.Router();
const  authUrl  =  'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
const authTkn = new Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.SECRET}`).toString("base64");

router.get('/auth', (req, res) => {
   
let request = unirest('GET', authUrl)
.headers({ 'Authorization': `Basic ${authTkn}` })
.send()
.end(res => {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
});

});

export default router;
