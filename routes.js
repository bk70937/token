const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const { namesymbol } = require('./controllers/nameSymbolController');
// const { creatematch } = require('./controllers/createMatchController');

router.post('/api/register', [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);


router.post('/api/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);


router.get('/api/getBalance', function(req, res){
    res.json({ balance: 100000 });
});

router.get('/api/getReward', function (req, res) {
    res.json({ reward: 1000 })
})

router.get('/api/startMatch', function (req, res) {
    var match = {
        
        wallet_address: ['0xF35ecD64D97B0Fcf8c90fbCFD163230d75003BF6'],
        amount: 1000000,

    }

    res.json(match)

})

router.get('/api/playerLeave', function (req, res) {
    var leave = { 
        matchid : true
    }
    res.json(leave)
})

router.get('/api/endGame', function (req, res) {
    var end = {   
        score : [100],
        bool: true,
        message: 'congratulation you have crossed 100'
    }
    res.json(end)
})

router.get('/api/claim', function (req, res) {
    var claim = {   
        wallet_address: ['0xF35ecD64D97B0Fcf8c90fbCFD163230d75003BF6'],
        amount: 1000000,
    }
    res.json(claim)
})

router.get('/api/resetPassword', function (req, res) {
    var reset = {   
        email: ['gmail@gmail.com'],
        bool: true,
        message: 'message send successfully'
    }
    res.json(reset)
})

router.get('/api/getNameSymbol',namesymbol);

module.exports = router;
