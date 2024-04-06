import axios from 'axios'
import unirest from 'unirest';


//middleware
const createToken = async (req, res, next) => {
    const secret = process.env.CONSUMER_SECRET;
    const consumer = process.env.CONSUMER_KEY
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    const url_dev = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    
    unirest('GET', url_dev)
    .headers({ 'Authorization': `Basic ${auth}` })
    .send()
    .end(res => {
        if (res.error) throw new Error(res.error);
        console.log(res.raw_body);
    });
    next()
  };
   

export default createToken;