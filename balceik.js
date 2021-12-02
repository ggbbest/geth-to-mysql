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
const caver = new Caver('http://192.168.1.157:8217/')

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
// https://klayswap.com/exchange/pool/detail/0xcc81d437ffc161d349d6186b1a1f8dde515093d6
// 0x286a6ce75d9f623ffba96fc2175fd5fbe2690746 
// https://scope.klaytn.com/account/0x50e746edaa283365136ed86a4e5dfddc6cd3cf9e?tabId=tokenBalance
// https://scope.klaytn.com/account/0xcc81d437ffc161d349d6186b1a1f8dde515093d6?tabId=tokenBalance

// const tokenAddress = "0xcc81d437ffc161d349d6186b1a1f8dde515093d6"; // KSP + CEIK
const tokenAddress = "0x50e746edaa283365136ed86a4e5dfddc6cd3cf9e"; // KLAY + CEIK
const walletAddress = "0x7C720ca152B43fa72a24eCcd51ccDAFBF74A884e"; // account address : CLIP
// const walletAddress = "0x286a6ce75d9f623ffba96fc2175fd5fbe2690746"; // account address : ?
const contract = new caver.klay.Contract(minABI, tokenAddress);

async function getBalance() {
  const result = await contract.methods.balanceOf(walletAddress).call(); // 
  const format = caver.utils.convertFromPeb(caver.utils.hexToNumberString(result));
  console.log(format);
}
getBalance();