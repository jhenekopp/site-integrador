const express = require('express');
const router = express.Router();

// Models
const Note = require('../models/Note');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// Nova anotação
router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({text: 'Escreva um titulo.'});
  }
  if (!description) {
    errors.push({text: 'Escreva uma descrição'});
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      title,
      description
    });
  } else {
    const newNote = new Note({title, description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Adicionado com sucesso');
    res.redirect('/notes');
  }
});

// Adicionar notas
router.get('/notes', isAuthenticated, async (req, res) => {
  const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
  res.render('notes/all-notes', { notes });
});

// Editar notas
router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  if(note.user != req.user.id) {
    req.flash('error_msg', 'Não autorizado');
    return res.redirect('/notes');
  } 
  res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Atualizado com sucesso');
  res.redirect('/notes');
});

// Apagar anotação
router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Apagado com sucesso');
  res.redirect('/notes');
});

module.exports = router;
