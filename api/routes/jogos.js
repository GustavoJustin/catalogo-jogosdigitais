const { Router } = require('express');
const controller = require('../controllers/jogosController');
const delay = require('../middleware/delay');

const router = Router();

router.get('/', delay, controller.listar);
router.get('/:id', delay, controller.detalhe);

module.exports = router;
