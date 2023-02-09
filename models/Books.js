module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define("Books", {
        isbn: {
            type: DataTypes.STRING(17),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publication_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        stock: {
            type: DataTypes.INTEGER,
        }
    });
    return Books;
}