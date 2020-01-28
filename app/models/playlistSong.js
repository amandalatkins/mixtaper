module.exports = function(sequelize, DataTypes) {
    var PlaylistSongs = sequelize.define("PlaylistSongs", {}, 
    {
        timestamps: false
    });

    PlaylistSongs.associate = function(models) {
        PlaylistSongs.belongsTo(models.Playlist, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
        PlaylistSongs.belongsTo(models.Song, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
        
    }

    return PlaylistSongs;
}