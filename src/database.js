const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/site-web', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
