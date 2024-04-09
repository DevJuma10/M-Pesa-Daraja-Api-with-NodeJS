/**
 * Use this API to generate a Dynamic QR which enables Safaricom M-PESA customers who have My Safaricom App or M-PESA app, 
 * to scan a QR (Quick Response) code, to capture till number and amount then authorize to pay for goods and services at select LIPA NA M-PESA (LNM) 
 * merchant outlets.
 */

import unirest from "unirest"
import dotenv from 'dotenv'
dotenv.config()

const qr_url = "https://sandbox.safaricom.co.ke/mpesa/qrcode/v1/generate"

const dynamicQR = async (req, res ) => {

    // Get Token from header
    let token =  await req.token
    const  { amount }  = req.body;

    await unirest ('POST', qr_url)
            .headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        
            .send(JSON.stringify({
                "MerchantName": process.env.MPESA_MERCHANT_NAME,
                "RefNo":"Dynamic QR Test",
                "Amount":amount,
                "TrxCode":"BG",
                "CPI":"254710182419",
                "Size":"300"
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

export default dynamicQR;