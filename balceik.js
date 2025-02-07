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

caver.klay.getBlockNumber().then(console.log);
// caver.klay.getBalance("0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4").;
// caver.rpc.klay.getBalance('0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4').then(console.log)

// The minimum ABI required to get the ERC20 Token balance
const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

// https://scope.klaytn.com/token/0x18814b01b5cc76f7043e10fd268cc4364df47da0?tabId=tokenTransfer
// https://klayswap.com/exchange/pool/detail/0xcc81d437ffc161d349d6186b1a1f8dde515093d6
// 0x286a6ce75d9f623ffba96fc2175fd5fbe2690746 
// https://scope.klaytn.com/account/0x50e746edaa283365136ed86a4e5dfddc6cd3cf9e?tabId=tokenBalance
// https://scope.klaytn.com/account/0xcc81d437ffc161d349d6186b1a1f8dde515093d6?tabId=tokenBalance


// "KLAY_CEIK": tokenAddress = "0x50e746edaa283365136ed86a4e5dfddc6cd3cf9e"; // 클레이튼+세이크
// "KSP_CEIK": tokenAddress = "0xcc81d437ffc161d349d6186b1a1f8dde515093d6"; // 클레이스왑+세이크

const tokenAddress = "0x18814b01b5cc76f7043e10fd268cc4364df47da0";  // ceik
// const tokenAddress1 = "0xcc81d437ffc161d349d6186b1a1f8dde515093d6"; // KSP + CEIK
// const tokenAddress2 = "0x50e746edaa283365136ed86a4e5dfddc6cd3cf9e"; // KLAY + CEIK
// const walletAddress = "0x7C720ca152B43fa72a24eCcd51ccDAFBF74A884e"; // account address : CLIP
// const walletAddress = "0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4"; // account address : --> 24 윈스톰 법사
const walletAddress = "0x00D917C0E0B273E3b51fa9C621271562B02800B4"; // account address : --> reel

const contract = new caver.klay.Contract(minABI, tokenAddress);

async function getBalanceCEIK() {
  const result = await contract.methods.balanceOf(walletAddress).call(); // 
  const format = caver.utils.convertFromPeb(caver.utils.hexToNumberString(result* 10000000000) ) ;
  console.log("CEIK:"+format);
}

getBalanceCEIK();

//################################################
// const getBalance = (address) => { 
// 	return caver.rpc.klay.getBalance(address).then((response) => 
// 	{
//     const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
//     console.log('BALANCE :'+ balance);
//     return balance;
// 	})
// }
// let user_bal = getBalance("0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4");
// console.log(user_bal+":user_bal");

var wallet_balance = caver.klay.getBalance(walletAddress, function(error, result) {
  wallet_balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(result));
  console.log("klay:"+wallet_balance);
});
// 0.10829499999999999