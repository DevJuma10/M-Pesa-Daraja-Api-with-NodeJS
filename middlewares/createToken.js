import unirest from 'unirest';


//middleware
const createToken = async (req, res, next) => {
    const secret = process.env.CONSUMER_SECRET;
    const consumer = process.env.CONSUMER_KEY
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    const url_dev = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    await unirest('GET', url_dev)
    .headers({ 'Authorization': `Basic ${auth}` })
    .send()
    .end(res => {
        if (res.error) {
          // Handle error
          console.error(res.error);
          return res.status(500).json({ error: 'Failed to generate token' });
      }

      //  Parse JSON response
      const responseBody = JSON.parse(res.raw_body)

      // Access the Token
      const token = responseBody.access_token

      // Attach token to request to  be used later
      req.token  =   token


        // console.log(res.raw_body);

        next()
        
    });
    
  };
   

export default createToken;