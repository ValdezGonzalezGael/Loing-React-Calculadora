const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/history', function(req, res) {
    models.history
        .findAll()
        .then(data => res.json(data))
        .catch(err => res.json({ errmsg: err.message }));
});

router.post('/history', function(req, res) {
    const history = req.body;

    models.history
        .create({ ...history })
        .then(data => res.json(data))
        .catch(err => res.json({ errmsg: err.message }));
});


module.exports = router;
