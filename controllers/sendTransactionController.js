require('dotenv').config() ;

const Web3 = require('web3')
const Provider = require('@truffle/hdwallet-provider')
const TEST_CONTRACT = require('../config/TEST_CONTRACT.json')
const privateKey = process.env.privateKey


const web3 = new Web3(new Web3.providers.HttpProvider( `https://rinkeby.infura.io/v3/90fd31f724654e36be4daf9d1cc7850a`));
const address = '0xd9145CCE52D386f254917e481eB44e9943F39138'
const from_address = '0xC8Da7b2DA6B2a757AaFaC0ec5E54dC1C3ba42F7f'
const contract = new web3.eth.Contract(TEST_CONTRACT, address)


const deploy = async() => { 
    const address = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee'
    const from_address = '0xC8Da7b2DA6B2a757AaFaC0ec5E54dC1C3ba42F7f'
    const contract = new web3.eth.Contract(TEST_CONTRACT, address)
    var value = 100e18
    let res = await contract.methods.transfer(address, value).send({from: from_address})
    return res
}
deploy()








