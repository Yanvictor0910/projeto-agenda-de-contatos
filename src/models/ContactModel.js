const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type:String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telphone: { type: String, required: false, default: '' },
    createdDate: { type: Date, default: Date.now },
    user_id: { type: String, required: true },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body,
    this.errors = [],
    this.contact = null
};

Contact.findId = async (id) => {
    if (typeof id !== 'string') return;
    const user = await ContactModel.findById(id);
    return user;
};

Contact.findContacts = async function (user) {
    if(!user) return {}
    const user_id = user._id
    const contacts = await ContactModel.find({user_id: user_id})
    .sort({ createdDate: -1 });

    return contacts;
};

Contact.delete = async (id) => {
    if( typeof id !== 'string') return;
    const contact = await ContactModel.findByIdAndDelete(id); 
    return contact;
};


Contact.prototype.edit = async function (id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;

    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
};

Contact.prototype.register = async function (user_id) {
    if(!user_id) return
    this.valida();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.create({name: this.body.name, surname: this.body.surname, email: this.body.email, telphone: this.body.telphone, user_id: user_id });
};

Contact.prototype.valida = function () {
    this.cleanUp()
    
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if (!this.body.name) this.errors.push('Você precisa preencher o Nome');
    if (!this.body.email && !this.body.telphone) this.errors.push('Você precisa preencher ao menos um dos campos: Telefone ou E-mail');
};

Contact.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        surname: this.body.surname,
        email: this.body.email,
        telphone: this.body.telphone,
    };
};

module.exports = Contact;