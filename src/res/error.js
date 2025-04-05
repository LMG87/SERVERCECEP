const response = require("./response");

function errors(err,req,res,next){
    console.log("Error", err);
    const message = err.message || "internal servel error :";
    let status = err.statusCode || "500";

    response.error(req,res,message,status);
}

module.exports = errors;