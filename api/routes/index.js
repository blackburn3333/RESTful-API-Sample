const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index.html',{port:req.socket.localPort});
});

module.exports = router;