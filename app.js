//Archivo que LEVANTA El server y lo configura.

const express = require("express");
const app = express();
const volleyball = require("volleyball");
const nunjucks = require("nunjucks");
const path = require("path");
const routes = require("./routes");
const db = require("./db/index");

//loggin middleware
app.use(volleyball);

app.use("/", routes); //USA LAS RUTAS

app.engine("html", nunjucks.render); // como renderear templates html
app.set("view engine", "html"); // que extensiones de archivo tienen los templates
nunjucks.configure("views", { noCache: true }); // donde encontrar las views

app.use(express.static(path.join(__dirname, "/public"))); //archivos STATICOS

app.use(express.json()); //PERSER
app.use(express.urlencoded({ extended: true }));

//arrancando server PERO primero cheque que la DataBase funque correctamente
db.sync({ force: false })
    .then(() => {
        console.log("FUNCA PA");
        app.listen(3000, () => {
            console.log("SERVER ON : http://localhost:3000");
        });
    })
    .catch((err) => {
        console.log("NO funca ", err);
    });
