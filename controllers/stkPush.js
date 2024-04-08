import unirest from 'unirest'

const stkPush_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
const passKey = process.env.MPESA_PASSKEY
const shortCode = process.env.MPESA_SHORTCODE

const date = new Date();
const timeStamp =
    date.getFullYear() 
    +
    ("0" + (date.getMonth() + 1)).slice(-2) 
    +
    ("0" + date.getDate()).slice(-2) 
    +
    ("0" + date.getHours()).slice(-2) 
    +
    ("0" + date.getMinutes()).slice(-2) 
    +
    ("0" + date.getSeconds()).slice(-2);
    
const password = new Buffer.from(shortCode+passKey+timeStamp).toString('base64')


//GET TOKEN FROM HEADER



const postStk = async (req, res) => {
    const { phone, amount} = req.body;
    unirest('POST', stkPush_url)
    .headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer PhlJu1MaqnG9Fhm8oKqMMh5ou0E2`
})
.send(JSON.stringify({
    "BusinessShortCode": shortCode,
    "Password": password,
    "Timestamp": timeStamp,
    "TransactionType": "CustomerPayBillOnline",
    "Amount": amount,
    "PartyA": phone,
    "PartyB": shortCode,
    "PhoneNumber": phone,
    "CallBackURL": "https://f6b5-102-0-8-140.ngrok-free.app/",
    "AccountReference": "business legit",
    "TransactionDesc": "Purchase of goods" 
  }))
.end(res => {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
});
}

export default postStk
