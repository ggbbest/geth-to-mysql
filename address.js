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


function sleep(time, callback) {
  var stop = new Date().getTime();
  while(new Date().getTime() < stop + time) {
      ;
  }
  callback();
}
///////////////////////////////////////////////
// web3.eth.getBlockNumber(function(error, result){
//   if (!error){
//     set_curBlock(result);
//   }else{
//     console.log("error:"+error);
//   }
// });

web3.eth.getAccounts().then(e => console.log(e));
web3.eth.getAccounts().then( function(e){
        addr1=e[0];
        addr2=e[1];
        console.log(addr1);
        console.log(e.length);
});