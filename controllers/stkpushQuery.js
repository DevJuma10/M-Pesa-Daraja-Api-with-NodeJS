import unirest from "unirest";
import dotenv from 'dotenv';
dotenv.config();
import passwordGenerator from "./utils/passwordGenerator.js";

const query_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';

const stkPushQuery = async (req, res) => {
    
    // Get Token from req header
    let token = req.token;
    const { checkoutRequestID } = req.body;

    await unirest('POST', query_url)
            .headers({
                'Content-Type'  :   'application/json',
                'Authorization' :   `Bearer ${token}`
            })
            .send(JSON.stringify({
                "BusinessShortCode": process.env.MPESA_SHORTCODE,
                "Password": passwordGenerator.password,
                "Timestamp": passwordGenerator.timeStamp,
                "CheckoutRequestID": checkoutRequestID,
            }))
            .end(response => {
                if (response.error) {
                    console.error(response.error);
                    console.log(response.body); // Log response body
                    return res.status(500).json({ error: 'Failed to query M-Pesa' });
                }

                res.status(200).json({
                    message: 'success',
                    data: response.body
                });
               
            });
};

export default stkPushQuery;
