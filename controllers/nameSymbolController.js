require('dotenv').config();

const Web3 = require('web3')
const infuraUrl = 'https://rinkeby.infura.io/v3/90fd31f724654e36be4daf9d1cc7850a' 
const TEST_CONTRACT = require('../config/TEST_CONTRACT.json')
const address = '0xd9145CCE52D386f254917e481eB44e9943F39138'


exports.namesymbol = function (req,res,next) {

    try{

        const web3 = new Web3(infuraUrl)
        const contract = new web3.eth.Contract(TEST_CONTRACT, address);
        contract.methods.name().call(function(err, data) {
            return res.status(201).json(data);
        })
        
    } catch(err) {
        next(err);
    }
}