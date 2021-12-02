// //npm install node-schedule
// //node block.js
// const schedule = require('node-schedule');
// const j = schedule.scheduleJob('60 * * * *', function(){
//   console.log('매 60초에 실행');
// });

// // *     *    *     *    *     *
// // ┬    ┬    ┬    ┬    ┬    ┬
// // │    │    │    │    │    │
// // │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// // │    │    │    │    └───── month (1 - 12)
// // │    │    │    └────────── day of month (1 - 31)
// // │    │    └─────────────── hour (0 - 23)
// // │    └──────────────────── minute (0 - 59)
// // └───────────────────────── second (0 - 59, OPTIONAL)
// // 등록한 스케줄을 취소하기 위해서는 cancel() 메소드를 사용할 수 있다.
// // j.cancel();
console.log("##### block save start #####");

var mysql = require('mysql');
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.185:21004"));

var latestSyncedBlock = 0;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const dotenv = require('dotenv');
dotenv.config();

// npm i sync-mysql
let db_config = require(__dirname + '/database.js');// 2020-09-13
let sync_mysql = require('sync-mysql'); //2020-01-28
let sync_connection = new sync_mysql(db_config.constr());

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
var txcount = 0;
// #################
var latest_block_number = 215114;
var start_Db_block_No = 215114;
main();

setInterval(() => {
  main();
}, (1000 * 60 * 5) ); // 5 minute

// #################

///////////////////////////////////////////////
function set_curBlock(cblock){
  latestSyncedBlock = cblock;
  // getCurTimestamp();  //Date.now()
  console.log(getCurTimestamp() +" block number => "+cblock);
}

function main(){
  web3.eth.getBlockNumber(function(error, result){
    if (!error){
      set_curBlock(result);
      latest_block_number = result;
    }else{
      console.log("error:"+error);
    }
  });
  
  var sql = "SELECT MAX(id) mxidx FROM block " ;
  let result = sync_connection.query(sql);
  start_Db_block_No = result[0].mxidx;

  console.log(latest_block_number + " : latest_block_number / "+start_Db_block_No + " : start_Db_block_No ");

  web3.eth.getBlockNumber(function(err, rtn) {
    // var latest_block_number = 214269;
    for(var i=start_Db_block_No; i <= latest_block_number; i++){
        web3.eth.getBlock(i, true, function(err, block) {
            var sql = "INSERT INTO block (id,blockhash, miner, timestamp, size, transactions, number, uncle_hash, data, gasused) VALUES ('" + block['number'] + "','" + block.hash + "', '" + block.miner + "', '" + block.timestamp + "', '" + block.size + "', '" + block.transactions + "', '" + block['number'] + "', '" + block.sha3Uncles + "', '" + block.extraData + "', '" + block.gasUsed + "') ON DUPLICATE KEY UPDATE id=id";
            // if(latest_block_number-1 ==i ){console.log(sql);}
            con.query(sql, function(err, result) {
              if (err) throw err;
  //console.log("block['number'] " + block['number'] + " INSERTED!");
            });
            var tr_length=0;
            try{ tr_length = block.transactions.length; }
            catch(error){ console.log(error); }
            if(tr_length>0){
  console.log("###################### " + block['number'] + " block.transactions #################################");
              for (var i = 0; i < block.transactions.length; i++) {
                var tx = block.transactions[i]
                var txsql = "INSERT INTO transaction (txid, value, gas, gasprice, nonce, txdata, block_id,sender,receiver,timestamp) VALUES ('" + tx.hash + "', '" + tx['value'] + "', '" + tx.gas + "', '" + tx.gasPrice + "', '" + tx.nonce + "', '" + tx['input'] + "', '" + block['number'] + "','" + tx["from"] + "','" + tx["to"] + "','" + block.timestamp + "')";
                addTx(txsql, tx.hash);
                var tosql = "INSERT INTO address_tr (address,inputcount,outputcount) VALUES ('" + tx["to"] + "',0,0) ON DUPLICATE KEY UPDATE idx=idx";
                var fromsql = "INSERT INTO address_tr (address,outputcount,inputcount) VALUES ('" + tx["from"] + "',0,0) ON DUPLICATE KEY UPDATE idx=idx";
                addAddress(tosql, fromsql, tx["to"], tx["from"]);
              }
            }
        });
        // console.log("###  for END ### ");
    }
    console.log(" ###  INSERTED! END ### ");
  });
  
}


function syncBlock(block) {
  var blockToSync = block;
  block = web3.eth.getBlock(blockToSync, true);
  var sql = "INSERT INTO block (id,blockhash, miner, timestamp, size, transactions, number, uncle_hash, data, gasused) VALUES ('" + block['number'] + "','" + block.hash + "', '" + block.miner + "', '" + block.timestamp + "', '" + block.size + "', '" + block.transactions + "', '" + block['number'] + "', '" + block.sha3Uncles + "', '" + block.extraData + "', '" + block.gasUsed + "') ON DUPLICATE KEY UPDATE id=id";
  console.log("SYNCING BLOCK NUMBER " + blockToSync);
  var timestamp = block.timestamp;
  if (block.transactions.length != 0) {
    con.query(sql, function(err, result) {
      if (err) throw err;
console.log("BLOCK " + block['number'] + " INSERTED!");
      for (var i = 0; i < block.transactions.length; i++) {
        var tx = block.transactions[i]
        var txsql = "INSERT INTO transaction (txid, value, gas, gasprice, nonce, txdata, block_id,sender,receiver,timestamp) VALUES ('" + tx.hash + "', '" + tx['value'] + "', '" + tx.gas + "', '" +tx.gasPrice + "', '" + tx.nonce + "', '"+ tx['input'] + "', '" + block['number'] + "','" + tx["from"] + "','" + tx["to"] + "','" + block.timestamp + "')";
          // + tx['input'] + "', '" + blockToSync + "','" + tx["from"] + "','" + tx["to"] + "','" + block.timestamp + "')";
        addTx(txsql, tx.hash);
        var tosql = "INSERT INTO address_tr (address,inputcount,outputcount) VALUES ('" + tx["to"] + "',0,0) ON DUPLICATE KEY UPDATE idx=idx";
        var fromsql = "INSERT INTO address_tr (address,outputcount,inputcount) VALUES ('" + tx["from"] + "',0,0) ON DUPLICATE KEY UPDATE idx=idx";
        addAddress(tosql, fromsql, tx["to"], tx["from"]);
      }
      latestSyncedBlock++;
      if (latestSyncedBlock < web3.eth.blockNumber) {
        syncBlock(latestSyncedBlock);
      } else {
        synced();
      }
    });
    console.log("BLOCK HASH: " + block.hash);
    //console.log('current block #' + block.number);
  } else {
    console.log('EMPTY BLOCK #' + block.number + ', IGNORING..');
    latestSyncedBlock++;
    if (latestSyncedBlock < web3.eth.blockNumber) {
      syncBlock(latestSyncedBlock);
    } else {
      synced();
    }
  }
}

function addTx(txsql, hash) {
  con.query(txsql, function(err, result) {
    if (err) throw err;
    txcount++;
    console.log("TX " + hash + " INSERTED!");
  });
}

function addAddress(to, fr, toad, frad) {
  con.query(fr, function(err, result) {
    if (err) throw err;
    console.log("Address " + frad + " INSERTED!");
  });
  con.query(to, function(err, result) {
    if (err) throw err;
    console.log("Address " + toad + " INSERTED!");
  });
  con.query("UPDATE address_tr SET inputcount = inputcount + 1 WHERE address = '" + toad + "'", function(err, result) {
    if (err) throw err;
    console.log(toad + " input count updated");
  });
  con.query("UPDATE address_tr SET outputcount = outputcount + 1 WHERE address = '" + frad + "'", function(err, result) {
    if (err) throw err;
    console.log(frad + " output count updated");
  });
}

function getCurTimestamp() {
  const d = new Date();

  return new Date(
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    )
  // `toIsoString` returns something like "2017-08-22T08:32:32.847Z"
  // and we want the first part ("2017-08-22")
  ).toISOString().replace('T','_').replace('Z','');
}
