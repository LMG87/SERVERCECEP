const Auth = require("../models/auth.model");
const User = require("../models/user.model");
const Rol = require("../models/rol.model");
const response = require("../res/response");
const bcrypt = require("bcrypt");

const getAll = async(req, res, next)=>{
    try {    
        const users = await User.findAll({
            include : { model: Rol, as: "Rol"}
        });
        let data = "";
        if (users.length>0) {
            data = { 
                total_registros: users.length,
                registros: users
            }
        } else {
            data = {
                message: "no hay registros en la tabla"
            }
        } 
        response.success(req,res,data,200);
    } catch (error) {
        next(error)
    }
};

const getOne = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const user = await User.findOne({where:{id},
            include : { model: Rol, as: "Rol"}
        },)
        let data = "";
        if (rol) {
            data = {
                registro: user
            }
        } else {
            data = {
                message: "no hay registro con ese id"
            }
        } 
        response.success(req,res,data,200);
    } catch (error) {
        next(error)
    }
};

const create = async (req,res,next)=>{
    try {
        const data = req.body;
        await User.sync();
        const createdUser = await User.create(data);
        let message;
        if (createdUser.id) {
            message = {
                msg: "registro efectuado exitosamente",
                regId: createdUser.id
            }
        } else {
            message = {
                msg: "error, usuario no creado"
            }
        }
        let createAuth="";
        if (data.email && data.password) {
            await Auth.sync();
            password = await bcrypt.hash(data.password.toString(),5);
            createAuth = await Auth.create({
                id: createdUser.id,
                email: data.email,
                password: password
            });
            message.authId = createAuth.id;
        }
        response.success(req,res,message,201);
    } catch (error) {
        next(error)
    }
};

const update = async(req,res,next)=>{
    try {
        const data = req.body;
        const id = req.params.id
        const updatedUser = await User.update(data,{ where: {id}});
        message = {
            msg: "registro actualizado exitosamente",
            regId: id
        }
        response.success(req,res,message,200);
    } catch (error) {
        next(error);
    }
};

const deleted = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const deleteUser = await User.destroy({where:{id}})
        let message = {
            msg: "Registro eliminado exitosamente",
            regId: id
        }
        response.success(req,res,message,200);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleted
}