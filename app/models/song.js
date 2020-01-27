module.exports = function(sequelize, DataTypes) {
    var Song = sequelize.define("Song", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    }, 
    {
        timestamps: false
    });

    Song.associate = function(models) {
        // Song.hasMany(models.PlaylistSongs, { onDelete: "CASCADE", foreignKey: { allowNull: false } }, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
        Song.belongsToMany(models.Playlist, {
            through: 'PlaylistSongs',
            // as: 'songs',
            foreignKey: 'SongId',
            otherKey: 'PlaylistId'
          });
    }

    return Song;
}