const Web3 = require('web3')
const Accounts = require('web3-eth-accounts')
const Provider = require('@truffle/hdwallet-provider')

const MyContract = require('../config/TEST_ABI.json')
const dotenv = require('dotenv');

const infuraUrl = 'https://rinkeby.infura.io/v3/90fd31f724654e36be4daf9d1cc7850a' // instead of infura will be used bscscan

async function init (id)  {

    dotenv.config()
    const provider = new Provider(process.env.privateKey, infuraUrl) 
    const web3 = new Web3(provider)

    const publicAddress = await web3.eth.getAccounts()
}
  

module.exports = init