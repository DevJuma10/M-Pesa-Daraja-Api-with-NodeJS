/**
 * Enquire the balance on an M-Pesa BuyGoods (Till Number)
 * 
 * The Account Balance API is used to request the account balance of a short code. 
 * This can be used for both B2C, buy goods and pay bill accounts.
 */

import unirest from "unirest";
import dotenv from 'dotenv'
dotenv.config();

const bal_url = 'https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query'

const checkBalance = async (req, res) => {

    // get token from header
    let token = req.token

    await unirest('POST' , bal_url)
            .headers({
                'Content-Type'  :   'application/json',
                'Authorization' :   `Bearer ${token}`
            })
            .send(JSON.stringify({
                "Initiator":process.env.INITIATOR_NAME,
                "SecurityCredential": process.env.SECURITY_CREDENTIAL,
                "Command ID": "AccountBalance",
                "PartyA": process.env.MPESA_SHORTCODE, // or MPESA TILL NO.
                "IdentifierType":"4", // 1:MSISDN 2:TILL NUMBER 4:ORGANIZATION SHORTCODE
                "Remarks":"ok",
                "QueueTimeOutURL":"http://myservice:8080/queuetimeouturl",
                "ResultURL":"http://myservice:8080/result",
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

export default checkBalance;