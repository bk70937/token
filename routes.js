const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const { namesymbol } = require('./controllers/nameSymbolController');
const { getBalance } = require('./controllers/getBalanceController');


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

const Web3 = require('web3')
const bscScan = 'https://data-seed-prebsc-1-s1.binance.org:8545/' 
const MY_CONTRACT = require('./config/MYCONTRACT_ABI.json')
const address = '0x84F97c2D5A5e2e99B026F3172Ea3D3303f3d48AC'


router.get('/api/getbalance', function (req,res) {

    try{

        const web3 = new Web3(bscScan)
        const myAddress = '0xC8Da7b2DA6B2a757AaFaC0ec5E54dC1C3ba42F7f'
        const contract = new web3.eth.Contract(MY_CONTRACT, address);

        contract.methods.getBalance().call(function() {
            web3.eth.getBalance(myAddress).then(balance => res.status(201).json(`Balance : ${balance}`))
        })
        
    } catch(err) {
        next(err);
    }
});

router.get('/api/getreward', function (req,res) {

    try{

        const web3 = new Web3(bscScan)
        const contract = new web3.eth.Contract(MY_CONTRACT, address);

        contract.methods.getReward().call(function(err, data) {
            return res.status(201).json({reward: data});
        })
        
    } catch(err) {
        next(err);
    }
});


module.exports = router;
