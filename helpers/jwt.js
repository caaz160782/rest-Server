require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret =  process.env.SECRET;

//expiresIn:"60s" "1h" // expires in 24 hours
const token = (payload) => {
  // const token =   jwt.sign(payload,secret, {expiresIn: "72h" } 
  // );
  // return token
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "72h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        } else {
          resolve(token)
      }
    })
  })
  };

const verify = (token) => {
  // const payload = jwt.verify(token, secret);
  // return payload
  return new Promise((resolve, reject) => {
   jwt.verify(token, secret,
      (err, tokenVerify) => {
        if (err) {
          console.log(err);
          reject('No se pudo verificar el token');
        } else {
          resolve(tokenVerify)
      }
    })
  })
 };

module.exports = {token,verify}