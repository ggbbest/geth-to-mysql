// yarn add axios
// let Parser = require('rss-parser');
// let parser = new Parser();
let axios = require('axios');

////////////////////////////////////////////////////////////////
var mysql = require('mysql');
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
var db_config = require(__dirname + '/database.js');// 2020-09-13
var sync_mysql = require('sync-mysql'); //2020-01-28
let sync_connection = new sync_mysql(db_config.constr());
////////////////////////////////////////////////////////////////

async function main(){
  let send_msg ="";
  let send_msg_save = false;
  let url = 'https://api.whale-alert.io/v1/transactions?api_key='+process.env.wHALEAPI_KEY+'&min_value=500000&limit=2&currency=usdt';
  axios.get(url)
  .then((res) => {
    // console.log(res.data.transactions);
    let rcvData = res.data.transactions;
    let i=0;
    rcvData.forEach(item => {
      i++;
      let blockchain      = item.blockchain.replace(/'/g, "`");
      let symbol          = item.symbol.replace(/'/g, "`");
      let id              = item.id.replace(/'/g, "`");
      let transaction_type = item.transaction_type.replace(/'/g, "`");
      let hash            = item.hash.replace(/'/g, "`");
      let from_address    = item.from.address.replace(/'/g, "`");
      let from_owner_type = item.from.owner_type.replace(/'/g, "`");
      let to_address      = item.to.address.replace(/'/g, "`");
      let to_owner_type   = item.to.owner_type.replace(/'/g, "`");
      let timestamp       = item.timestamp;
      let amount          = item.amount;
      let amount_usd      = item.amount_usd;
      let transaction_count = item.transaction_count;
      if(i<5){
        let result5 = sync_connection.query("SELECT count(id) dupChk FROM whaleTr where id= "+id);
        var dupChk = result5[0].dupChk;
        if(dupChk==0){
          let sql = "INSERT INTO whaleTr (blockchain,symbol,id,transaction_type,hash,from_address,from_owner_type,to_address,to_owner_type,timestamp,amount,amount_usd,transaction_count ) ";
          sql = sql + " VALUES ('" + blockchain+"','"+symbol+"','"+id+"','"+transaction_type+"','"+hash+"','"+from_address+"','"+from_owner_type+"','"+to_address+"','"+to_owner_type+"',"+timestamp+","+amount+","+amount_usd+","+transaction_count+"); ";
          console.log(sql);
          con.query(sql, function(err, result) {
            if (err) throw err;
          });
          if(!send_msg_save){
            send_msg = encodeURI(blockchain+"☆"+symbol+" "+from_owner_type+" 에서 "+to_owner_type+" 지갑으로 ☆ "+amount_usd+"$ 출금 확인 포착 출처 - https://web.c4ei.net");
            send_msg_save = true;

            let url2 = 'https://api.telegram.org/bot5425504638:AAE517IWgNSbcnMlumqh5glwUKBiQ4UqGsg/sendMessage?chat_id=-1001638921944&text='+send_msg;
            axios.get(url2).then((res) => {
              console.log("telegram : " + send_msg);
            }).catch(error => {
              console.log(error);
            });

            var sql3 = "DELETE FROM whaleTr WHERE regdate < DATE_ADD(NOW(), INTERVAL -1 DAY);";
            var result3 = con.query(sql3);
            console.log(sql3);
          }
        }
      }
    });
  }).catch(error => {
    console.log(error);
  });

  // https://api.telegram.org/bot5425504638:AAE517IWgNSbcnMlumqh5glwUKBiQ4UqGsg/sendMessage?chat_id=-1001638921944&text=
  // 🔴 Binance 에서 알 수 없는 지갑으로 🔴
  // 대략 499 BTC :: (165억) 출금 확인 포착
  // 현재 비트코인 달러 가격 : $29,727
  // 현재 비트코인 원화 가격 : 37,720,000원
  // 출처 - https://web.c4ei.net

  console.log(getCurTimestamp() +" / runnung !!!");
  // ####################################
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

main();
const interval = setInterval(() => { main(); console.log('====== 15 Sec 마다 실행 ======'); }, 1000*15);
