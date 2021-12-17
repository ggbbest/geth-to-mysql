console.log("#####  node sendbck  start #####");

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
// const receiverAddress = "0x014B0c7D9b22469fE13abf585b1E38676A4a136f"; // bank4C4ei
// const receiverAddress = "0x0169Eb3f0383b5D1138CbAB1dAcCE11Afb2c779F"; // c4ei.net@gmail.com
const receiverAddress = "0xAd70df6Bd78734721F42CD8cCACe42b25D83Aa65"; // metamast
const senderAddress = "0x0178791B2e27287911FD06FD2Ba28c77C0Db4B1c"; // 윈스톰 법사 C4EI
const bck_SCaddress = "0x1d187BbeCeF8d7b1731339c301ab8354d4F0A50b";
const bckExchangeAbi = require("./erc20abi.json");
const sendBCK = web3.utils.toHex(1 * 1000000000000000000); // 1 BCK

async function fn_unlockAccount_token(addr){
  let rtn_result = false;
  await web3.eth.personal.unlockAccount(addr, process.env.C4EI_ADDR_PWD, 500).then(function (result) {
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
    const TokenInstance = new web3.eth.Contract(bckExchangeAbi, bck_SCaddress)
    TokenInstance.methods.transfer(receiverAddress, sendBCK).send({from: senderAddress})
    .on('transactionHash', (hash) => { console.log("### transactionHash ###"); console.log(hash);})
    .once('receipt', (receipt) => {
      console.log("blockNumber " + receipt.blockNumber + " / contractAddress" + receipt.contractAddress + " / blockHash" + receipt.blockHash + " / transactionHash" + receipt.transactionHash);
    })
    // .on('confirmation', (confirmationNumber, receipt) => { console.log("### confirmation ###" + confirmationNumber);})
    .on('error', console.error);
}

sendTokenBCK();
////////////////////////////////////////////////////////////////