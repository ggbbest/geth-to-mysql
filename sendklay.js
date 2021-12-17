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

const Caver = require('caver-js')
const caver = new Caver(process.env.CEIK_RPC)

////////////////////////////////////////////////////////////////
const receiverAddress = "0x7C720ca152B43fa72a24eCcd51ccDAFBF74A884e"; // CLIP
const senderAddress = "0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4"; // 윈스톰 법사 CEIK

async function fn_unlockAccount_token(addr){
  console.log('fn_unlockAccount_token addr :' + addr);
  let rtn_result = false;
  await caver.klay.personal.unlockAccount(addr, process.env.C4EI_ADDR_PWD, 500).then(function (result) {
    rtn_result = result;
    console.log('fn_unlockAccount_token result :' + result);
  });
  return await rtn_result;
}
async function sendTokenKLAY(){
  if (await fn_unlockAccount_token(senderAddress)){
    await sendToken();
  }
}
async function sendToken(){
  let tx = {
    type: 'VALUE_TRANSFER',
    from: senderAddress,
    to: receiverAddress,
    value: caver.utils.toPeb('0.1', 'KLAY'),
    gas: 300000
  };
  caver.klay.sendTransaction(tx).then((receipt) => {
    // console.log(receipt);
    console.log("blockNumber " + receipt.blockNumber + " / contractAddress" + receipt.contractAddress + " / blockHash" + receipt.blockHash + " / transactionHash" + receipt.transactionHash);
  });
}

sendTokenKLAY();
////////////////////////////////////////////////////////////////
/*
const wallet = caver.klay.accounts.wallet;
const senderPK = wallet.add('0xYOUR_PRIVATE_KEY');

let tx = {
    type: 'VALUE_TRANSFER',
    from: senderPK.address,
    to: '0xRECIPIENT_ADDRESS',
    value: caver.utils.toPeb('1', 'KLAY'),
    gas: 300000
};

(async () => {
    // sign first and send later
    let signedTX = await caver.klay.accounts.signTransaction(tx, senderPK.privateKey);
    await caver.klay.sendSignedTransaction(signedTX.rawTransaction)
        .on('transactionHash', function(txhash) {
            console.log('hash first', txhash);
        })
        .on('receipt', function(receipt) {
            console.log('receipt later', receipt);
        })
        .on('error', function(err) {
            console.error('not good');
        });

    // alternatively, sign and send with one function call
    caver.klay.sendTransaction(tx).then((receipt) => {
        console.log(receipt);
    });
})();

*/
