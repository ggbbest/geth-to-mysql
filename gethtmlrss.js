// yarn add rss-parser
// cd /home/dev/www/geth-to-mysql
// node gethtmlrss

let Parser = require('rss-parser');
let parser = new Parser();
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

    let feed = await parser.parseURL('https://www.coindeskkorea.com/rss/allArticle.xml');
    // console.log(feed.title);
    let i=0;
    feed.items.forEach(item => {
      i++;
      // console.log(item.title + ':' + item.link);
      let title = item.title.replace(/'/g, "`");
      let link = item.link.replace(/'/g, "`");
      if(i<5){
        let sql = "INSERT INTO shownews (title , url) VALUES ('" + title + "','" + link + "'); ";
        console.log(sql);
        con.query(sql, function(err, result) {
          if (err) throw err;
        });
      }
    });

    let result2 = sync_connection.query("SELECT MAX(idx)-10 as dCnt FROM shownews");
    var dCnt = result2[0].dCnt;
    var sql3 = "DELETE FROM shownews WHERE idx < "+dCnt;
    var result3 = con.query(sql3);
    console.log(sql3);
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
const interval = setInterval(() => { main(); console.log('====== 60MIN 마다 실행 ======'); }, 1000*60*60);
// main();
