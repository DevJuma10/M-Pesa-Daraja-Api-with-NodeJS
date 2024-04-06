import axios from 'axios'
import unirest from 'unirest';


//middleware
const createToken = async (req, res, next) => {
    const secret = process.env.CONSUMER_SECRET;
    const consumer = process.env.CONSUMER_KEY
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    const url_dev = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    // await axios
    //   .get(url_dev,
    //     {
    //       headers: {
    //         authorization: `Basic ${auth}`,
    //       },
    //     }
    //   )
    //   .then((data) => {
    //     console.log(data)
    //     token = data.data.access_token;
    //     console.log(data.data);
    //     next();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(400).json("TOKEN GENERETION ERROR: " + err.message);
    //   });

    unirest('GET', url_dev)
    .headers({ 'Authorization': `Basic ${auth}` })
    .send()
    .end(res => {
        if (res.error) throw new Error(res.error);
        console.log(res.raw_body);
    });
  };
   

export default createToken;





// .send()
// .end(res => {
//     if (res.error) throw new Error(res.error);
//     console.log(res.raw_body);
// });