module.exports = function(sequelize, DataTypes) {
    var Playlist = sequelize.define("Playlist", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,160]
            }
        }
    }, 
    {
        timestamps: false
    });

    Playlist.associate = function(models) {
        Playlist.belongsTo(models.User, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
        Playlist.hasMany(models.PlaylistSongs, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
    }

    return Playlist;
}