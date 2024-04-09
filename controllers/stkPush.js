import unirest from 'unirest'
import passwordGenerator from '../utils/passwordGenerator.js'
import dotenv from  'dotenv'
dotenv.config()


const stkPush_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
const timeStamp = passwordGenerator.timeStamp
const password = passwordGenerator.password





const postStk = async (req, res) => {

    //GET TOKEN FROM HEADER
    let token = req.token

    const { phone, amount} = req.body;
    unirest('POST', stkPush_url)
    .headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
})
.send(JSON.stringify({
    "BusinessShortCode": process.env.MPESA_SHORTCODE,
    "Password": password,
    "Timestamp": timeStamp,
    "TransactionType": "CustomerPayBillOnline",
    "Amount": amount,
    "PartyA": phone,
    "PartyB": process.env.MPESA_SHORTCODE,
    "PhoneNumber": phone,
    "CallBackURL": "https://f6b5-102-0-8-140.ngrok-free.app/",
    "AccountReference": "Pay RelyOn Ltd",
    "TransactionDesc": "Purchase of goods" 
  }))
.end(response => {
    if (response.error) {
        console.error(response.error);
        console.log(response.body); // Log response body
        throw new Error(response.error);
    }
    // Log successful response body
    res.status(200).json({
        message : 'success',
        data : response.body
    })
});
}

export default postStk
