console.log("#####  node sendCEIK  start #####");

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
// const Web3 = require("web3");
// const provider = "http://192.168.1.185:21004"
// const web3 = new Web3(new Web3.providers.HttpProvider(provider));
const Caver = require('caver-js')
const caver = new Caver(process.env.CEIK_RPC)

////////////////////////////////////////////////////////////////
const receiverAddress = "0x7C720ca152B43fa72a24eCcd51ccDAFBF74A884e"; // CLIP
const senderAddress = "0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4"; // 윈스톰 법사 CEIK
const ceik_contract_abi = require("./ceikABI.json");
const ceik_tokenAddress = "0x18814b01b5cc76f7043e10fd268cc4364df47da0";  // ceik
const ceik_tokenABI = "0x9166c8d72e513a9e3b8389c11481ec071da93e37370fc62bf99c51a7b869a7dd";
// const sendCEIK = (caver.utils.toPeb(1, 'KLAY') *0.0000000001); // 1 CEIK
const sendCEIK = (1 * 100000000); // 1 CEIK

async function fn_unlockAccount_token(addr){
  let rtn_result = false;
  await caver.klay.personal.unlockAccount(addr, process.env.C4EI_ADDR_PWD, 500).then(function (result) {
    rtn_result = result;
    console.log('fn_unlockAccount_token result :' + result);
  });
  return await rtn_result;
}
async function sendTokenKLAY_CEIK(){
  if (await fn_unlockAccount_token(senderAddress)){
    await sendToken();
  }
}
async function sendToken(){
    const TokenInstance = new caver.klay.Contract(ceik_contract_abi, ceik_tokenAddress)
    TokenInstance.methods.transfer(receiverAddress, sendCEIK)
    .send({from: senderAddress,gas: 100000})
    .then(function(receipt){
      console.log("blockNumber " + receipt.blockNumber + " / contractAddress" + receipt.contractAddress + " / blockHash" + receipt.blockHash + " / transactionHash" + receipt.transactionHash);
    })
    // .on('transactionHash', (hash) => { console.log("### transactionHash ###"); console.log(hash);})
    // .once('receipt', (receipt) => {console.log("blockNumber " + receipt.blockNumber + " / contractAddress" + receipt.contractAddress + " / blockHash" + receipt.blockHash + " / transactionHash" + receipt.transactionHash);})
    // .on('confirmation', (confirmationNumber, receipt) => { console.log("### confirmation ###" + confirmationNumber);})
    // .on('error', console.error)
    ;
}

sendTokenKLAY_CEIK();
////////////////////////////////////////////////////////////////