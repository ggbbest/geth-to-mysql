// npm i caver-js
console.log("#####  cr_address_klay save start #####");
// cd /home/dev/www/geth-to-mysql
// node cr_address_klay
// node cr_address_klay >>klay600.txt

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

const Caver = require('caver-js')
const caver = new Caver('http://192.168.1.157:8217/')

// console.log( "insert into address_klay (address, privatekey) values ('"+ wallet.address +"','"+ wallet.privateKey+"');");

for(let i=0;i<600;i++){
  const wallet = caver.klay.accounts.create(process.env.C4EI_ADDR_PWD);
  var sql = "insert into address_klay (address, privatekey) values ('"+ wallet.address +"','"+ wallet.privateKey+"') ";
  // con.query(sql, function(err, result) {
  //   if (err) throw err;
  //   console.log( sql );
  // });
  console.log( sql );
  // 2nd 
  // personal.importRawKey('"+wallet.privateKey+"', '"+process.env.C4EI_ADDR_PWD+"');  // 2021-11-09 add
}



