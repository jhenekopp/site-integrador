const express = require('express');
const router = express.Router();


router.get('/class/sala',(req, res) => {
    res.render('class/sala');
});
  


module.exports = router;