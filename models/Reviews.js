module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("Reviews", {
        UID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publication_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    });
    return Reviews;
}