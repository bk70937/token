require('dotenv').config() ;

const Web3 = require('web3')
const Provider = require('@truffle/hdwallet-provider')
const web3 = new Web3(new Web3.providers.HttpProvider( `https://rinkeby.infura.io/v3/90fd31f724654e36be4daf9d1cc7850a`));
// const web3 = new Web3('https://rinkeby.infura.io/v3/90fd31f724654e36be4daf9d1cc7850a');
const address = '0xd9145CCE52D386f254917e481eB44e9943F39138'
const TEST_CONTRACT = require('./config/TEST_CONTRACT.json')

const contract = new web3.eth.Contract(TEST_CONTRACT, address);

// contract.methods.name().call(function(err, data) {
//     console.log(data)
// })

// contract.methods.symbol().call(function(err, data) {
//     console.log(data)
// })

contract.methods.name().call((err, data) => console.log(data))
contract.methods.symbol().call((err, data) => console.log(data))

















































// const init = async () => {
//     const web3 = new Web3(infuraUrl)
//     const test = new web3.eth.Contract(MyContract, address);
//     console.log(test)
//     var name =  await test.methods.name().call();
//     console.log(name)
// }



