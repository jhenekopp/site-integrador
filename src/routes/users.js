const router = require('express').Router();
const passport = require('passport');

// Models
const User = require('../models/User');

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password, address, address2, city, state, university, course, ano, arquivo} = req.body;
  if(password != confirm_password) {
    errors.push({text: 'As senhas são diferentes'});
  }
  if(password.length < 4) {
    errors.push({text: 'As senhas devem ter pelo menos 4 caracteres.'})
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, name, email, password, confirm_password, address, address2, city, state, university, course, ano, arquivo});
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'O email já está em uso.');
      res.redirect('/users/signup');
    } else {
      // Saving a New User
      const newUser = new User({name, email, password, address, address2, city, state, university, course, ano, arquivo });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Você está registrado.');
      res.redirect('/users/signin');
    }
  }
});

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/class/sala',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Você está desconectado agora.');
  res.redirect('/users/signin');
});

module.exports = router;
