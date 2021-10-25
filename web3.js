const Web3 = require('web3');
const web3 = new Web3.providers.HttpProvider('http://localhost:7545');

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_x",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "x",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const address = "0xCAd3C0F9DC4e85d2E775297cf37cF7D53dDbC5B2";

const contract = new Web3.eth.Contract(abi, address);






