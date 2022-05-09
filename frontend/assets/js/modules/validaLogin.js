import validator from 'validator';
import messages from './messages';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    };

    init(){
        this.events()
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
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        messages.clearMessages(el);

        if(!validator.isEmail(emailInput.value)){
            messages.messageError('Email inválido', el);
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50){;
            messages.messageError('Senha precisa estar entre 3 e 50 caracteres', el);
            error = true;
        }

        if(!error){  
            el.submit();
        }
    };
};
