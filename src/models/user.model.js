const { DataTypes } =  require("sequelize");
const sequelize = require("../db/db");

const User = sequelize.define(
    "User",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        first_name:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull: {msg:"El nombre es obligatorio"}
            }
        },
        last_name:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull: {msg:"El Apellido es obligatorio"}
            }
        },
        telephone:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull: {msg:"El telefono es obligatorio"}
            }
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
                notNull: {msg:"El correo electronico es obligatorio"}
            }
        },
        avatar:{
            type:DataTypes.STRING(200),
            defaultValue: "http://localhost:3000/images/users/avatar/avatar-user.png"
        },
        imagePath:{
            type: DataTypes.STRING(200)
        },
        RolId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate:{
                notNull: {msg:"El rol es obligatorio"}
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = User;