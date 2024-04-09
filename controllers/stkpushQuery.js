/**
 * Use this API to check the status of a Lipa Na M-Pesa Online Payment.
 */
import unirest from "unirest";
import dotenv from 'dotenv'
dotenv.config();
// {    
//     "BusinessShortCode":"174379",    
//     "Password": "MTc0Mzc5YmZiMjc5TliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
//     "Timestamp":"20160216165627",    
//     "CheckoutRequestID": "ws_CO_260520211133524545",    
//  }   

const query_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';

const  stkPushQuery = async (req, res) => {
    
    // Get Token from req header
    let token = req.token
    const { CheckoutRequestID } = req.body

    await unirest('POST', query_url)
            .headers({
                'Content-Type'  :   'application/json',
                'Authorization' :   `Bearer ${token}`
            })
            .send(JSON.stringify({
                "BusinessShortCode": procees.env.MPESA_SHORTCODE,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNDA5MTAyNTM1",
                "Timestamp": "20240409102535",
                "CheckoutRequestID": CheckoutRequestID,
            }))
}

export default stkPushQuery;



let unirest = require('unirest');
let req = unirest('POST', 'https:/sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query')
.headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ZkyQrNYWUeF2fPaBOnyY7CA3lv6N'
})
.send(JSON.stringify({
    "BusinessShortCode": 174379,
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNDA5MTAyNTM1",
    "Timestamp": "20240409102535",
    "CheckoutRequestID": "ws_CO_08042024141900404710182419",
  }))
.end(res => {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
});