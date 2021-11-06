require('dotenv').config();

const Web3 = require('web3')
const bscScan = 'https://data-seed-prebsc-1-s1.binance.org:8545/' // instead of infura will be used bscscan
const MATCH_CONTRACT = require('../config/MYCONTRACT_ABI.json')
const privateKey = process.env.privateKey
const addressFrom = '0xC8Da7b2DA6B2a757AaFaC0ec5E54dC1C3ba42F7f' 

exports.init = function(req,res,next) {

    try {
        
        const web3 = new Web3(bscScan)
        const address = ''
        const contract = new web3.eth.Contract(MATCH_CONTRACT, address)
        var matchId = 0
        var amount = web3.utils.toWei('1')
        var encodedABI = contract.methods.createMatch(matchId, amount).encodeABI();        
            
        const createTransaction =   web3.eth.accounts.signTransaction(
            {
                from: addressFrom,
                to: address,
                value: web3.utils.toWei('0', 'ether'),
                gas: '22000',
                data: encodedABI
            }, privateKey)
    
            const createReceipt =   web3.eth.sendSignedTransaction(
                createTransaction.rawTransaction
            )

            return res.status(200).json(createReceipt.transactionHash);
            
    } catch(err) {
        next(err);
    }
}