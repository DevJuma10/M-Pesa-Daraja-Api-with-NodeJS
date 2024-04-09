/**
 * Transact between an M-Pesa short code to a phone number registered on M-Pesa
 * 
 * B2C API is an API used to make payments from a Business to Customers (Pay Outs), also known as Bulk Disbursements. 
 * B2C API is used in several scenarios by businesses that require to either make Salary Payments, Cashback payments, 
 * Promotional Payments(e.g. betting winning payouts), winnings, financial institutions withdrawal of funds, loan disbursements, etc.
 */

import unirest from "unirest"
import dotenv from 'dotenv';
dotenv.config()




const b2c_url = 'https://sandbox.safaricom.co.ke/mpesa/b2c/v3/paymentrequest'


const business2customer = async (req, res) => {
// Get token from header
let token = req.token
let { commandID, amount } = req.body

unirest('POST', b2c_url)
        .headers({
            'Content-Type'  :   'application/json',
            'Authorization' :   `Bearer ${token}`
        })
        .send(JSON.stringify({
            "OriginatorConversationID": process.env.ORIGINATOR_CONVERSATION_ID,
            "InitiatorName": process.env.INITIATOR_NAME,
            "SecurityCredential": process.env.SECURITY_CREDENTIAL,
            "CommandID": commandID,
            "Amount": amount,
            "PartyA": process.env.INITIATOR_SHORTCODE,
            "PartyB": 254710182419,
            "Remarks": "Test Chrismass Bonus",
            "QueueTimeOutURL": "https://mydomain.com/b2c/queue",
            "ResultURL": "https://mydomain.com/b2c/result",
            "Occasion": "13th Cheque",
          }))
          .end(response => {
            if (response.error) {
                console.error(response.error);

                // Log response body
                console.log(response.body); 
                throw new Error(response.error);
            }
            // Log successful response body
            res.status(200).json({
                message : 'success',
                data : response.body
            })
        });
}






export default business2customer

