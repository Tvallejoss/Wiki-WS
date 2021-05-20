//archivo de rutas

const express = require("express");
const router = express.Router();
const models = require("../models");

router.use(express.json()); //PERSER
router.use(express.urlencoded({ extended: true }));

module.exports = router;

const Page = models.Page;
const Users = models.User;

router.get("/", (req, res, next) => {
    res.render("index");
});

router.get("/wiki", (req, res, next) => {
    res.redirect("/");
});

router.post("/wiki", (req, res, next) => {
    // const { name, email, tittle, content, status } = req.body;
    //  Users.create({name,email}).then((UsuarioCreado)=>{
    //      res.status(201).send("USUARIO CREADO")
    //  })
    console.log(req.body);
    const title = req.body.title;
    console.log(title);
    const content = req.body.content;

    console.log(content);

    Page.create({ title: title, content: content })
        .then((PaginaCreada) => {
            res.status(201).send("PAGINA CREADA");
        })
        .catch((err) => {
            console.log(err);
        });

    res.redirect("/");
});

router.get("/wiki/add", (req, res, nex) => {
    res.render("addpage");
});
