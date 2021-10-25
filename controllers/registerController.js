const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

const Web3 = require('web3')
const Accounts = require('web3-eth-accounts')
const Provider = require('@truffle/hdwallet-provider')
const infuraUrl = 'https://rinkeby.infura.io/v3/90fd31f724654e36be4daf9d1cc7850a' // instead of infura will be used bscscan
const MyContract = require('../config/TEST_ABI.json')
const dotenv = require('dotenv');

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `email` FROM `users` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already Registered",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        dotenv.config()
        // const provider = new Provider(infuraUrl) 
        const web3 = new Web3(infuraUrl)
    
        const publicAddress = await web3.eth.accounts.wallet.create(1)
        // console.log(publicAddress[0])  

        const [rows] = await conn.execute('INSERT INTO `users`(`name`,`email`,`wallet`,`private_key`,`password`) VALUES(?,?,?,?,?)',[
            req.body.name,
            req.body.email,
            publicAddress[0].address,
            publicAddress[0].privateKey,
            hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully registered.",
            });
        }
        
    }catch(err){
        next(err);
    }
}