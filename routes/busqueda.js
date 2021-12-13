const { Router } = require("express");
const { check } = require("express-validator");
const {buscar} = require('../controllers/busqueda');


const router = Router();


router.get('/:coleccion/:termino',buscar)

module.exports = router;