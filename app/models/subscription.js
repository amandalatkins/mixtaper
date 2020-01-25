module.exports = function(sequelize, DataTypes) {
    var Subscription = sequelize.define("Subscription", {}, 
    {
        timestamps: false
    });

    Subscription.associate = function(models) {
        Subscription.belongsTo(models.Playlist, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
        Subscription.belongsTo(models.User, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
    }

    return Subscription;
}