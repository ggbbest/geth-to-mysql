console.log("#####  balceik balance start #####");
const mysql = require('mysql');
// const Web3 = require("web3");
// const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.185:21004"));
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const dotenv = require('dotenv');
dotenv.config();
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
const Caver = require('caver-js')
const caver = new Caver(process.env.CEIK_RPC)
// const caver = new Caver('https://api.baobab.klaytn.net:8651/')
// 0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4  --> 24 윈스톰 법사

// caver.klay.getBlockNumber().then(console.log);
// caver.klay.getBalance("0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4");
const walletAddress = "0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4"; // account address : --> 24 윈스톰 법사
var wallet_balance = caver.klay.getBalance(walletAddress, function(error, result) {
  wallet_balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(result));
  console.log("klay:"+wallet_balance);
});
// 0.10829499999999999