// Create Token and saving in cookie

const sendTokenbankuser = (bankuser, statusCode, res) => {
    const bankusertoken = bankuser.getJWTToken();
    
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("bankusertoken", bankusertoken, options).json({
      success: true,
      bankuser,
      bankusertoken,
    });
  };
  
  module.exports = sendTokenbankuser;
  