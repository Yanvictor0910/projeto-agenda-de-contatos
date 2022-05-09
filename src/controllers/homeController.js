const Contact = require("../models/ContactModel");

exports.index = async (req, res) => {
    const contacts = await Contact.findContacts(req.session.user);
    res.render('index', { contacts });
};