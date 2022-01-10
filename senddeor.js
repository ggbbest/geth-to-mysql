console.log("#####  node senddeor  start #####");

const mysql = require('mysql');
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
const Web3 = require("web3");
const provider = "http://192.168.1.185:21004"
const web3 = new Web3(new Web3.providers.HttpProvider(provider));

////////////////////////////////////////////////////////////////
const senderAddress = "0x66eC272Cf68967Ff821dB6Fd5AB8AE2Ed35014E4"; // 2
//const receiverAddress = "0xAd70df6Bd78734721F42CD8cCACe42b25D83Aa65"; // metamast
const receiverAddress = "0x348f8985efAaC9ced0bad87670f84787e19f2391"; // lgpc
const deor_SCaddress = "0x6335E94a01D21DA57e2AA5EBAdf1935A934A70EC";
const bckExchangeAbi = require("./erc20abi.json");
const sendAMT = web3.utils.toHex(1 * 10000000000); // 1 DEOR

async function fn_unlockAccount_token(addr){
  let rtn_result = false;
  await web3.eth.personal.unlockAccount(addr, process.env.C4EI_ADDR_PWD2, 500).then(function (result) {
    rtn_result = result;
    console.log('fn_unlockAccount_token result :' + result);
  });
  return await rtn_result;
}
async function sendTokenBCK(){
  if (await fn_unlockAccount_token(senderAddress)){
    await sendToken();
  }
}
async function sendToken(){
    const TokenInstance = new web3.eth.Contract(bckExchangeAbi, deor_SCaddress)
    TokenInstance.methods.transfer(receiverAddress, sendAMT).send({from: senderAddress})
    .on('transactionHash', (hash) => { console.log("### transactionHash ###"); console.log(hash);})
    .once('receipt', (receipt) => {
      console.log("blockNumber " + receipt.blockNumber + " / contractAddress" + receipt.contractAddress + " / blockHash" + receipt.blockHash + " / transactionHash" + receipt.transactionHash);
    })
    // .on('confirmation', (confirmationNumber, receipt) => { console.log("### confirmation ###" + confirmationNumber);})
    .on('error', console.error);
}

sendTokenBCK();
////////////////////////////////////////////////////////////////