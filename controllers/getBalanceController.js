const Web3 = require('web3')
const bscScan = 'https://data-seed-prebsc-1-s1.binance.org:8545/' 
const MY_CONTRACT = require('../config/MYCONTRACT_ABI.json')
const address = '0x84F97c2D5A5e2e99B026F3172Ea3D3303f3d48AC'


exports.namesymbol = function (req,res) {

    try{

        const web3 = new Web3(bscScan)
        const myAddress = '0xC8Da7b2DA6B2a757AaFaC0ec5E54dC1C3ba42F7f'
        const contract = new web3.eth.Contract(MY_CONTRACT, address);

        contract.methods.getBalance().call(function() {
            web3.eth.getBalance(myAddress).then(balance => res.status(201).json(balance))
        })
        
    } catch(err) {
        next(err);
    }
};