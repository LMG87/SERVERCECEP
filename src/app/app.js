const express =  require("express");
const cors = require("cors");
const path =require("path");

const config = require("../config");

const app = express();
const error = require("../res/error");

const roles = require("../routes/rol.routes");
const users = require("../routes/user.routes");
const auth = require("../routes/auth.routes");


//middlewares de configuracion
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//config
app.set('port',config.app.port);//middlewares de configuracion
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//config
app.set('port',config.app.port);

//Rutas
app.use("/api/rol", roles);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

//public static path files
app.use(express.static(path.join(__dirname,"../../uploads")));

//End ponit not found
app.use((req,res,next)=>{
    res.status(404).json({
        message: "Endpoint not found"
    });
});

module.exports = app;