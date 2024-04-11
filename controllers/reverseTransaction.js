/**
 * Reverses an M-Pesa transaction.
 * 
 * Reverses a C2B M-Pesa transaction.
 * Once a customer pays and there is a need to reverse the transaction, the organization will use this API to reverse the amount.
 * 
 * Important parameters:
 * TransactionID -> This is the Mpesa Transaction ID of the transaction which you wish to reverse.
 * Amount --> The amount transacted in the transaction is to be reversed, down to the cent.
 * Receiver Party --> Your Org's shortcode.
 */

import unirest from "unirest";
import dotenv from 'dotenv'
dotenv.config()

const reverse_url = "https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request"

const reverseTransaction = async (req, res) => {

    // Get Token from header
    let token = req.token

    const { amount , transactionId } = req.body

    await unirest ('GET', reverse_url)
            .headers({
                'Content-Type'  :   'application/json',
                'Authorization' :   `Bearer ${token}`

            })
            .send(JSON.stringify({    
                "Initiator":process.env.INITIATOR_NAME,    
                "SecurityCredential": process.env.SECURITY_CREDENTIAL, // encrypted password    
                "CommandID":"TransactionReversal",    
                "TransactionID": transactionId, //original trans id    
                "Amount":amount, // transaction amount    
                "ReceiverParty": process.env.MPESA_SHORTCODE,    
                "RecieverIdentifierType":"11",    
                "ResultURL":"https://ip:port/",    
                "QueueTimeOutURL":"https://ip:port/",    
                "Remarks":"Test",    
                "Occasion":"work"
             }))

}

export default reverseTransaction