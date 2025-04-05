const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../middlewares/error");

const secret = config.jwt.secret;

function assingToken(data){
    return jwt.sign(data,secret);
}

function verifyToken(token){
    return jwt.verify(token, secret);
}

const checkToken = {confirmToken: function(req, id, type){
    const decode = decodeHeader(req);
    console.log(decode);
    if(type === 0){
        if(decode.dataValues.id != id && decode.RolId != "86eb1508-eabf-4297-817c-3a8db0dfe4b5"){
            throw error("you don't have privileged to do this action ", 401)
        }
    }
}};

function getToken(authorization){
    if (!authorization) {
        throw error("No token provide", 401);
    }
    if(authorization.indexOf("Bearer")===-1){
        throw error("Invalid Format", 401);
    }
    let token = authorization.replace('Bearer ',"");
    
    return token;
}

function decodeHeader(req){
    const authorization = req.headers.authorization || "";
    const token = getToken(authorization);
    console.log(token);
    const decode = verifyToken(token);
    req.user = decode;
    return decode;
}

module.exports = {
    assingToken,
    checkToken
}