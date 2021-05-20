//Archivo donde creo la tabla Pages y la exporto

const S = require("sequelize");
const db = require("../db"); //Requiero la base de datos

class Page extends S.Model {}

Page.init(
    {
        title: {
            type: S.STRING,
            allowNull: false,
        },
        urlTitle: {
            //'lecciones_en_programacion'
            //ruta : '/wiki/lecciones_en_programacion'
            type: S.STRING,
            allowNull: false,
        },
        content: {
            type: S.TEXT,
            allowNull: false,
        },
        status: {
            type: S.ENUM("open", "close"),
        },
        date: {
            type: S.DATE,
            defaultValue: S.NOW,
        },
        getRoute: {
            type: S.VIRTUAL,
            get() {
                return "/wiki/" + this.urlTittle;
            },
        },
    },
    { sequelize: db, modelName: "pages" }
);

module.exports = Page;
