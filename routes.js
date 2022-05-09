const express = require("express");
const router = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware')

// Home routes
router.get('/', homeController.index);
// Login routes
router.get('/login', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

// Contact routes
router.get('/contact', loginRequired, contactController.index);
router.post('/contact/register', loginRequired, contactController.register);
router.get('/contact/:id', loginRequired, contactController.editIndex);
router.post('/contact/edit/:id', loginRequired, contactController.edit);
router.get('/contact/delete/:id', loginRequired, contactController.delete);

module.exports = router;