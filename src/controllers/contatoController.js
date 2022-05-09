const Contact = require('../models/ContactModel');
const ContactModel = require('../models/ContactModel')

exports.index = (req, res) => {
    res.render('contact', {
        contact: {}
    })
};

exports.register = async (req, res) => {
    try{
    const contact = new ContactModel(req.body);
    await contact.register(req.session.user._id);
    if (contact.errors.length > 0) {
        req.flash('errors', contact.errors);
        req.session.save(() => res.redirect('/contact'));
        return;
    }   
    
    req.flash('success', 'Contato registrado com sucesso');
    req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
    return;
    }catch(e){
        console.log(e);
        return res.render('404')
    }
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contact = await Contact.findId(req.params.id);
    if(!contact) return res.render('404');
    res.render('contact', {
        contact
    })
};

exports.edit = async (req, res) =>{
    try{
    if(!req.params.id) return res.render('404');
    const contact = new Contact(req.body); 
    await contact.edit(req.params.id)

    if(contact.errors > 0) {
        req.flash('errors', contact.errors);
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return
    }

    req.flash('success', 'Contato editado com sucesso');
    req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
    return
    }catch{(e)
        console.log(e);
        res.render('404')
    }
};

exports.delete = async (req, res) =>{
    try{
        if(!req.params.id) return res.render('404');
        const contact = await Contact.delete(req.params.id);

        req.flash('success', 'Contato excluido com sucesso');
        req.session.save(() => res.redirect(`/`));
        return
    }catch(e) {
        console.log(e);
        return render('404');
    }
}