
exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        res.render('404');
    };
    next();
};

exports.checkCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user){
        req.flash('errors', 'Você precisa fazer login')
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
};
