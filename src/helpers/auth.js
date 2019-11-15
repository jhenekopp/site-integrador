const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Faça o login corretamente.');
  res.redirect('/users/signin');
};

module.exports = helpers;
