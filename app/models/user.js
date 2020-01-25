// require node package for encrypting passwords
const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {

    // Create User model
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: false
    });

    // Add associates to Playlist and Subscription models
    User.associate = models => {
        User.hasMany(models.Playlist, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
        User.hasMany(models.Subscription, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
    }

    // Add a method to the User prototype which uses bcrypt to compare what was sent by the client to what is stored in the database
    User.prototype.validPass = pw => {
        return bcrypt.compareSync(pw, this.password);
    };

    // This will run every time .create() is used on the User model. It runs before the user is actually added to the database.
    User.addHook("beforeCreate", newUser => {
        // Take the client supplied password and encrypt it before storing in the database.
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10), null);
    });
    
    return User;
}