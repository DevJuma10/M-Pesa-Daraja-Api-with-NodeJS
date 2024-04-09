import dotenv from 'dotenv'
dotenv.config();

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

const password = new Buffer.from(
                    process.env.MPESA_SHORTCODE+process.env.MPESA_PASSKEY+ timeStamp).toString('base64')

export default { password, timeStamp }