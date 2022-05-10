import messages from './messages';
import validator from 'validator';

export default class Contact{
    constructor(classForm) {
        this.form = document.querySelector(classForm);
    };

    init(){
        this.events();
    };

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate(e);
        });
    };

    validate(e){
        const el = e.target;
        const nameInput = el.querySelector('input[name="name"]');
        const surnameInput = el.querySelector('input[name="surname"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telphoneInput = el.querySelector('input[name="telphone"]');
        let error = false;

        messages.clearMessages(el);

        console.log(emailInput.value);

        if(nameInput.value === '') {
            messages.messageError('Nome é um campo obrigatório', el);
            error = true;
        }

        if(emailInput.value !== ''){
            const isEmail = validator.isEmail(emailInput.value);

            if(!isEmail) {
                messages.messageError('E-mail Inválido', el);
                error = true;
            }
        }

        if(emailInput.value === '' && telphoneInput.value === ''){
            messages.messageError('Você precisa preencher ao menos um dos campos(E-mail ou Telefone)', el);
            error = true;
        }

        if(!error) el.submit();
    }
};