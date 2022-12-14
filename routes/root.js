const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

router.get('/new-page.html', function (req, res) {
  const file = fs.readFile(path.join(__dirname, '..', 'views', 'new-page.html'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    }
    else {
      res.send(data)
    }
  });

})





module.exports = router;