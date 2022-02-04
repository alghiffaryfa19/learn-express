const { sequelize, Sequelize } = require("../config/database");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    return User
}