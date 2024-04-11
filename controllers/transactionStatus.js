/**
 * Check the status of a transaction.
 */

import unirest from "unirest";
import dotenv from 'dotenv'
dotenv.config()


const checkTransactionStatus = async (req, res) => {
// Get auth token from header
let token = req.token
// let { transactionId } = req.body
const status_url = 'https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query'

await unirest('POST', status_url)
            .headers({
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            })
            .send(JSON.stringify({
                "Initiator": process.env.INITIATOR_NAME,
                "SecurityCredential": process.env.SECURITY_CREDENTIAL,
                "CommandID": "TransactionStatusQuery",
                "TransactionID": "OEI2AK4Q16",
                "PartyA": 600996,
                "IdentifierType": 4,
                "ResultURL": "https://mydomain.com/TransactionStatus/result/",
                "QueueTimeOutURL": "https://mydomain.com/TransactionStatus/queue/",
                "Remarks": "OK",
                "Occassion": "OK",
              }))
            .end(response => {
                console.log(response.body)
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

export default checkTransactionStatus

