// node create_address.js
console.log("#####  address save start #####");

var mysql = require('mysql');
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.185:21004"));

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

///////////////////////////////////////////////
for(let i=0;i<200;i++){
    const wallet = web3.eth.accounts.create(process.env.C4EI_ADDR_PWD);
    console.log( "insert into address (address, privatekey) values ('"+ wallet.address +"','"+ wallet.privateKey+"');");
    web3.personal.importRawKey('"+wallet.privateKey+"', '"+process.env.C4EI_ADDR_PWD+"');  // 2021-11-09 add
}
///////////////////////////////////////////////

// web3.eth.getAccounts().then(e => console.log(e));
// web3.eth.getAccounts().then( function(e){
//         addr1=e[0];
//         addr2=e[1];
//         console.log(addr1);
//         console.log(e.length);
// });

