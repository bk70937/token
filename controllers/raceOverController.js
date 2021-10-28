require('dotenv').config();

const Web3 = require('web3')
const infuraUrl = 'https://rinkeby.infura.io/v3/90fd31f724654e36be4daf9d1cc7850a' // instead of infura will be used bscscan
const RACE_CONTRACT = require('../config/RACE_ABI.json')
const privateKey = process.env.privateKey
const addressFrom = '0xF35ecD64D97B0Fcf8c90fbCFD163230d75003BF6' 
const addressTo = '0xC8Da7b2DA6B2a757AaFaC0ec5E54dC1C3ba42F7f'

exports.init = function (req,res,next) {

    try {
        
        const web3 = new Web3(infuraUrl)
        const address = '0x35621ddB21653fc5c006F5Db29769E813b8F6406'
        const contract = new web3.eth.Contract(RACE_CONTRACT, address)
        var raceId = 1
        var status = 1
        var encodedABI = contract.methods.raceOver(raceId, status).encodeABI();        
            
        const createTransaction =  web3.eth.accounts.signTransaction(
            {
                from: addressFrom,
                to: address,
                gas: '22000',
                data: encodedABI
            }, privateKey)
    
            // deploy
            const createReceipt =  web3.eth.sendSignedTransaction(
                createTransaction.rawTransaction
            )
    
            console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`)

    } catch(err) {
        next(err);
    }
}