import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../css/style.css';

import Login from './modules/validaLogin';
import Contact from './modules/validaContato';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

login.init();
cadastro.init();

const contato = new Contact('.form-contato');

contato.init();