console.log("#####  balance start #####");

var mysql = require('mysql');
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.185:21004"));

var latestSyncedBlock = 0;
var curBlock = 0;
var txcount = 0;
//var txsql=[];
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const dotenv = require('dotenv');
dotenv.config();

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

// web3.eth.getAccounts().then(e => console.log(e));
// web3.eth.getAccounts().then( function(e){
//         addr1=e[0];
//         addr2=e[1];
//         console.log(addr1);
//         console.log(e.length);
// });
function set_curBlock(cblock){
  latestSyncedBlock = cblock;
  console.log("block number => "+cblock);
}

web3.eth.getBlockNumber(function(error, result){
  if (!error){
    set_curBlock(result);
  }else{
    console.log("error:"+error);
  }
});

class TransactionChecker {
  constructor(address) {
    this.address = address.toLowerCase();
    // this.web3 = new Web3("https://mainnet.infura.io/v3/60968ff3b2f84a0ebdff7a993f4d080b");
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.185:21004"));
  }

  async checkBlock() {
    let block = await this.web3.eth.getBlock('latest');
    let number = block.number;
    let transactions = block.transactions;
    console.log('Search Block: ' + transactions);

    if (block != null && block.transactions != null) {
      for (let txHash of block.transactions) {
        let tx = await this.web3.eth.getTransaction(txHash);
        if (this.address == tx.to.toLowerCase()) {
          console.log("from: " + tx.from.toLowerCase() + " to: " + tx.to.toLowerCase() + " value: " + tx.value);
        }
      }
    }
  }
}

var transactionChecker = new  TransactionChecker('0xAd70df6Bd78734721F42CD8cCACe42b25D83Aa65');
transactionChecker.checkBlock();
