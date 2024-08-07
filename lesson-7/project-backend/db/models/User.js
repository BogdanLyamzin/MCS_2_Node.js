import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const User = sequelize.define(
    "user",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)

// User.sync();

export default User;