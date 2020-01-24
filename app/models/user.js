module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,20]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8,16]
            }
        }
    }, 
    {
        timestamps: false
    });
    User.associate = models => {
        User.hasMany(models.Playlist, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
        User.hasMany(models.Subscription, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
    }
    return User;
}