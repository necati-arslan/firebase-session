const express = require('express');
const router = express.Router();
const members = require('../../Members');

router.get('/',(req,res)=>{
    //res.send('router testing...');
    res.json(members);
});

router.post('/',(req,res)=>{
    res.send(req.body);
});


module.exports = router;