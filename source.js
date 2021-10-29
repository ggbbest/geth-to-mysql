console.log("##### start #####");

var mysql = require('mysql');
// const Web3 = require("web3");
// // const WSS = "wss://192.168.0.185:21004";
// // const WSS = "wss://rpc.c4ei.net";

// const options = {
//   // Enable auto reconnection
//   reconnect: {
//       auto: true,
//       delay: 5000, // ms
//       maxAttempts: 5,
//       onTimeout: false
//   }
// };
// //https://github.com/ChainSafe/web3.js/releases/tag/v1.2.7
// const web3 = new Web3.providers.WebsocketProvider('ws://192.168.0.185:21004', options) 
// var web3 = new Web3(provider);
// var Web3 = require('web3');
// var web3 = new Web3();
// web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.185:21004"));
// web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.c4ei.net"));

///////////////////////////////////////////////
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.185:21004"));

var latestSyncedBlock = 0;
var curBlock = 0;
var txcount = 0;
//var txsql=[];

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expc4ei"
});


function sleep(time, callback) {
  var stop = new Date().getTime();
  while(new Date().getTime() < stop + time) {
      ;
  }
  callback();
}
///////////////////////////////////////////////
web3.eth.getBlockNumber(function(error, result){
  if (!error){
    set_curBlock(result);
  }else{
    console.log("error:"+error);
  }
});

web3.eth.getBlockNumber(function(err, rtn) {
  // var latest_block_number = 174648;
  var latest_block_number = 175247;
  for(var i=175001; i <= latest_block_number; i++){
  // for(var i=0; i <= latest_block_number; i++){
      // setTimeout( function() { console.log(" Waiting for blocks...."+i); }, 100)
      // sleep(100, function() { });
      web3.eth.getBlock(i, true, function(err, block) {
          //# TODO: DB에 insert하는 코드
          // console.log(block);
          //setBlock2Db(i);
          var sql = "INSERT INTO block (id,blockhash, miner, timestamp, size, transactions, number, uncle_hash, data, gasused) VALUES ('" + block['number'] + "','" + block.hash + "', '" + block.miner +
            "', '" + block.timestamp + "', '" + block.size + "', '" + block.transactions + "', '" + block['number'] + "', '" + block.sha3Uncles + "', '" + block.extraData + "', '" + block.gasUsed +
            "') ON DUPLICATE KEY UPDATE id=id";
          console.log(sql);
          con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("block['number'] " + block['number'] + " INSERTED!");
          });
          var tr_length=0;
          try{
            block.transactions.length = tr_length;
          }
          catch(error){
            console.log(error);
          }
          if(tr_length>0){
            for (var i = 0; i < block.transactions.length; i++) {
              var tx = block.transactions[i]
              var txsql = "INSERT INTO transaction (txid, value, gas, gasprice, nonce, txdata, block_id,sender,receiver,timestamp) VALUES ('" + tx.hash + "', '" + tx['value'] + "', '" + tx.gas + "', '" +
                tx.gasPrice + "', '" + tx.nonce + "', '" + tx['input'] + "', '" + blockToSync + "','" + tx["from"] + "','" + tx["to"] + "','" + timestamp + "')";
              addTx(txsql, tx.hash);
              var tosql = "INSERT INTO address (address,inputcount,outputcount) VALUES ('" + tx["to"] + "',0,0) ON DUPLICATE KEY UPDATE id=id";
              var fromsql = "INSERT INTO address (address,outputcount,inputcount) VALUES ('" + tx["from"] + "',0,0) ON DUPLICATE KEY UPDATE id=id";
              addAddress(tosql, fromsql, tx["to"], tx["from"]);
            }
          }
      });
  }
  console.log(" ###  INSERTED! END ### ");
});

// // for(var i=1; i <= 10; i++){
// //   setBlock2Db(i)
// // }
// function setBlock2Db(i) {
//   // var blockToSync = block;
//   // block = web3.eth.getBlock(blockToSync, true);
//   web3.eth.getBlock(i, false, function(err, block) {
//       //# TODO: DB에 insert하는 코드
//       // console.log(block);
//       var sql = "INSERT INTO block (id,blockhash, miner, timestamp, size, transactions, number, uncle_hash, data, gasused) VALUES ('" + block['number'] + "','" + block.hash + "', '" + block.miner +
//       "', '" + block.timestamp + "', '" + block.size + "', '" + block.transactions + "', '" + block['number'] + "', '" + block.sha3Uncles + "', '" + block.extraData + "', '" + block.gasUsed +
//       "') ON DUPLICATE KEY UPDATE id=id";
//     console.log(sql);
//     con.query(sql, function(err, result) {
//       if (err) throw err;
//       console.log("block['number'] " + block['number'] + " INSERTED!");
//     });
//   });
// }

//web3.eth.getAccounts().then(e => console.log(e));
// web3.eth.getAccounts().then( function(e){
//         addr1=e[0];
//         addr2=e[1];
//         console.log(addr1);
//         console.log(addr2);
// });
function set_curBlock(cblock){
  latestSyncedBlock = cblock;
  console.log("block number => "+cblock);
}

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM block", function(err, result, fields) {
//     if (err) throw err;
//     console.log("DB LAST SYNCED BLOCK " + result[result.length - 1].id);
//     latestSyncedBlock = parseInt(result[result.length - 1].id);
//     if (latestSyncedBlock < curBlock) {
//       //syncBlock(latestSyncedBlock);
//       console.log(" need sync : ")
//     } else {
//       //synced();
//       console.log(" not need synced : ")
//       // web3.eth.getBlock(2);
//     }
//   });
//   console.log("Connected to mysql!");
// });
////////////////////////////////////////////////
/*
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM block", function(err, result, fields) {
    if (err) throw err;
    console.log("LAST SYNCED BLOCK " + result[result.length - 1].id);
    console.log(" 64 curBlock : " + curBlock)
    latestSyncedBlock = parseInt(result[result.length - 1].id);
    if (latestSyncedBlock < web3.eth.blockNumber) {
    //if (latestSyncedBlock < curBlock) {
      syncBlock(latestSyncedBlock);
    } else {
      synced();
    }
  });
  console.log("Connected to mysql!");
});

function synced() {
  console.log("SYNCED");
  setInterval(function() {
    console.log("Waiting for blocks....");
  }, 20000)
  // var filter = web3.eth.filter('latest');
  //-->
  let filter = web3.eth.subscribe('newBlockHeaders')
  filter.subscribe((error, result) => {
    if (error) {
      console.log("Error subscribing to event", error)
      process.exit()
    }
  }).on('data', blockHeader => {
    if (!blockHeader || !blockHeader.number)
      return
    console.log("Block "+blockHeader.number)
    curBlock = blockHeader.number;  //
    //var block = web3.eth.getBlock(result);
    // syncBlock(block['number']);
    syncBlock(blockHeader.number);
  })

  // filter.watch(function(error, result) {
  //   console.log(result)
  //   console.log("RESULT")
  //   var block = web3.eth.getBlock(result);
  //   syncBlock(block['number']);
  // });
}
*/

function syncBlock(block) {
  var blockToSync = block;
  block = web3.eth.getBlock(blockToSync, true);
  var sql = "INSERT INTO block (id,blockhash, miner, timestamp, size, transactions, number, uncle_hash, data, gasused) VALUES ('" + block['number'] + "','" + block.hash + "', '" + block.miner +
    "', '" + block.timestamp + "', '" + block.size + "', '" + block.transactions + "', '" + block['number'] + "', '" + block.sha3Uncles + "', '" + block.extraData + "', '" + block.gasUsed +
    "') ON DUPLICATE KEY UPDATE id=id";
  console.log("SYNCING BLOCK NUMBER " + blockToSync);
  var timestamp = block.timestamp;
  if (block.transactions.length != 0) {
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("BLOCK " + block['number'] + " INSERTED!");
      for (var i = 0; i < block.transactions.length; i++) {
        var tx = block.transactions[i]
        var txsql = "INSERT INTO transaction (txid, value, gas, gasprice, nonce, txdata, block_id,sender,receiver,timestamp) VALUES ('" + tx.hash + "', '" + tx['value'] + "', '" + tx.gas + "', '" +
          tx.gasPrice + "', '" + tx.nonce + "', '" + tx['input'] + "', '" + blockToSync + "','" + tx["from"] + "','" + tx["to"] + "','" + timestamp + "')";
        addTx(txsql, tx.hash);
        var tosql = "INSERT INTO address (address,inputcount,outputcount) VALUES ('" + tx["to"] + "',0,0) ON DUPLICATE KEY UPDATE id=id";
        var fromsql = "INSERT INTO address (address,outputcount,inputcount) VALUES ('" + tx["from"] + "',0,0) ON DUPLICATE KEY UPDATE id=id";
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
  con.query("UPDATE address SET inputcount = inputcount + 1 WHERE address = '" + toad + "'", function(err, result) {
    if (err) throw err;
    console.log(toad + " input count updated");
  });
  con.query("UPDATE address SET outputcount = outputcount + 1 WHERE address = '" + frad + "'", function(err, result) {
    if (err) throw err;
    console.log(frad + " output count updated");
  });
}
