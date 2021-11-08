require('dotenv').config()

const Web3 = require('web3')
const express = require('express')
const Tx = require('ethereumjs-tx')
const app = express()

//Infura HttpProvider Endpoint
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/90fd31f724654e36be4daf9d1cc7850a"))

app.get('/api/sendtx',function(req,res){

        var myAddress = '0xC8Da7b2DA6B2a757AaFaC0ec5E54dC1C3ba42F7f'
     
        const privateKey = Buffer.from('f39429eb5f8f793342181f7994bb32b79ba2e7d13ab0aa3f884d38cde727f06f', 'hex')

        var contractABI =require('./config/MYCONTRACT_ABI.json')
        var contractAddress ="0x74515A9bf07d16A330cb1aa2Af36134118776A0D"
        var contract = new web3.eth.Contract(contractABI,contractAddress)
        
        web3.eth.getTransactionCount(myAddress).then(function(req, res){
            var amount = web3.utils.toHex(1e16)
            var matchId = 0
            var encodedABI = contract.methods.createMatch(matchId, amount).encodeABI()
            var rawTransaction = {
                from: myAddress, 
                to: contractAddress,
                gasPrice: web3.utils.toHex(20* 1e9),
                gasLimit: web3.utils.toHex(21000),
                value: web3.utils.toWei('.000001', 'ether'),
                data: encodedABI,
            }

            console.log(rawTransaction);
            var transaction = new Tx(rawTransaction);
            // console.log(transaction)
            transaction.sign(privateKey)
            web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
            .on('transactionHash',console.log)
        })
    })
    
app.listen(3000, () => console.log('Example app listening on port 3000!'))