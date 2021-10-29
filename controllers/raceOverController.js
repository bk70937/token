require('dotenv').config();

const Web3 = require('web3')
const bscScan = 'https://data-seed-prebsc-1-s1.binance.org:8545/' // instead of infura will be used bscscan
const RACE_CONTRACT = require('../config/RACE_ABI.json')
const privateKey = process.env.privateKey
const addressFrom = '0x7a129e2cc0cc83f37dd1b607961c78f8f069c1b2' 
const addressTo = '0xC8Da7b2DA6B2a757AaFaC0ec5E54dC1C3ba42F7f'

exports.init = function(req,res,next) {

    try {
        
        const web3 = new Web3(bscScan)
        const address = '0x2bf56511DD0Bd92F63e0321ed9bFACfAfd19cA63'
        const contract = new web3.eth.Contract(RACE_CONTRACT, address)
        var raceId = 0
        var status = 1
        var encodedABI = contract.methods.raceOver(raceId, status).encodeABI();        
            
        const createTransaction =   web3.eth.accounts.signTransaction(
            {
                from: addressFrom,
                to: address,
                gas: '22000',
                data: encodedABI
            }, privateKey)
    
            // deploy
            const createReceipt =   web3.eth.sendSignedTransaction(
                createTransaction.rawTransaction
            )

            return res.status(200).json(createReceipt.transactionHash);
            
    } catch(err) {
        next(err);
    }
}