require('dotenv').config() 

const Web3 = require('web3')

const privateKey = process.env.privateKey
const addressFrom = '0xF35ecD64D97B0Fcf8c90fbCFD163230d75003BF6' 
const addressTo = '0xC8Da7b2DA6B2a757AaFaC0ec5E54dC1C3ba42F7f'
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')
const TEST_CONTRACT = require('./config/TEST_CONTRACT.json')

const deploy = async () => {

    const address = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee'
    const contract = new web3.eth.Contract(TEST_CONTRACT, address)
    var value = web3.utils.toWei('1')
    var encodedABI = contract.methods.transfer(addressTo, value).encodeABI();
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from: addressFrom,
            to: address,
            value: web3.utils.toWei('0', 'ether'),
            gas: '215760',
            data: encodedABI
        }, privateKey)

    console.log(createTransaction)
        // deploy
        const createReceipt = await web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
        )

        console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`)
}

deploy()


