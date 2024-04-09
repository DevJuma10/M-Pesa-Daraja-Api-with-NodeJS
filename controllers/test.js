import passwordGenerator from "./utils/passwordGenerator.js"

const routeTest =  (req,res) => {
    let message =  "Route Works !!"

    // Access the token from req obj
    const  token =  req.token
    console.log(token)
   

    res.status(200).json({
        status:'success',
        message
    })

}

export default routeTest;