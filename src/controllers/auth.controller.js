const Auth = require("../models/auth.model");
const Rol = require("../models/rol.model");
const User = require("../models/user.model");
const response = require("../res/response");
const bcrypt = require("bcrypt");
const auth = require("../auth");

async function login(req,res,next){
    let email = req.body.email;
    let password = req.body.password;
    try {
        const data = await Auth.findOne({where: {email}});
        const user= await User.findOne({where: {email},
            include : { model: Rol, as: "Rol"}});
        const resp = await validatePassword(password, data.password, data, user);
        response.success(req,res,resp,200);
    } catch (error) {
        next(error)
    }
}

const validatePassword = (pass1, pass2, data, user) =>{
    return bcrypt.compare(pass1,pass2).then((res)=>{
        if (res=== true) {
            data.rol_id = user.rol_id;
            var resp = {
                token: auth.assingToken({...data}),
                user
            };
            return resp
        }else{
            throw new Error("informacion invalida");
        }
    })
}

const create = async(req,res,next)=>{
    try {
        const data = req.body;
        await Auth.sync();
        password = bcrypt.hash(data.password.toString(),5);
        createAuth = await Auth.create({
            id: data.id,
            email: data.email,
            password: password
        });
        message={
            msg: "registro efectuado exitosamente",
            regId: createAuth.id
        }
    } catch (error) {
        next(error)
    }
} 

module.exports = {
    login,
    create
}