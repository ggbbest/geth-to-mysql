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
for(let i=0;i<2;i++){
    const wallet = web3.eth.accounts.create();
    console.log(wallet.address +":"+ wallet.privateKey);
}
///////////////////////////////////////////////

// web3.eth.getAccounts().then(e => console.log(e));
// web3.eth.getAccounts().then( function(e){
//         addr1=e[0];
//         addr2=e[1];
//         console.log(addr1);
//         console.log(e.length);
// });


// insert into address (address) values ('0xAd70df6Bd78734721F42CD8cCACe42b25D83Aa65');
// insert into address (address) values ('0x66eC272Cf68967Ff821dB6Fd5AB8AE2Ed35014E4');
// insert into address (address) values ('0xc780046949A72968cC476636FA450605391eFbE1');
// insert into address (address) values ('0x1A0E55aCa24a99cE180Fd9D27fCCD9895bEa487C');
// insert into address (address) values ('0x24cbf96168B7F6D4562AEd90aB3cBD274349884B');
// insert into address (address) values ('0xa880fAb00Cc63D543bfD262920E2312308Ea33D7');
// insert into address (address) values ('0x9cE3d41c9E0e8166c2C73F020F86D7A2f69CB495');
// insert into address (address) values ('0xd58874FA33e2d671264cdD28921c465536BB1C25');
// insert into address (address) values ('0xc85B241663126a7852217671D0A852f329902EfE');
// insert into address (address) values ('0x58f303A52061781FD36782DD80Ff35e121d1C70B');
// insert into address (address) values ('0x421F7206dee9D593519DBa344bF165814Ab9B602');
// insert into address (address) values ('0x87837DB7056Fb4393Bc9aA089501725956651D12');
// insert into address (address) values ('0x1366Cb4e47548928f582F0ea7A5EbABB5dE27D67');
// insert into address (address) values ('0xEF422fae39C65a228942A0b26aA000d299dDA8D0');
// insert into address (address) values ('0x5a3b89E697516b53a99410378715d5b8ea7C9aa2');
// insert into address (address) values ('0x9a566ccfE8f3eD29528Cc50096859E7a4DaB3589');
// insert into address (address) values ('0x01C14CFa8128a56aD7189Aa750162EC6335D625F');
// insert into address (address) values ('0xBB7CC3f4f3B4E1F72b08E160C20a3C5692180F21');
// insert into address (address) values ('0xF79aA3D85C91bE6c986EeBf35c2306ef851Ab753');
// insert into address (address) values ('0x21F7f51C810b8c2B9271F67C686022bF357FdfC1');
// insert into address (address) values ('0xF2F8FF7C907E27ec902c211A890DaCaA5b42910B');
// insert into address (address) values ('0xcCf17F0820a80657252739A45081303f597593c4');
// insert into address (address) values ('0x7EA2F4a90a3a99f9B21c62AbE5B57777B24870c4');
// insert into address (address) values ('0x42b09115017BA16362B0dC4920fe9e297d6610Ff');
// insert into address (address) values ('0xcCe8Ce6F702444b90eE604f95BeCB6fF7d27F59d');
// insert into address (address) values ('0x05860ae1f28e52cD30Da353E4dc70E1044923383');
// insert into address (address) values ('0x238cb79AC44945A5B75F000bb81B4cddD544Eec4');
// insert into address (address) values ('0x37e1Cb49e926bF270017bDA6D9e9c92c64a85E46');
// insert into address (address) values ('0x13C6EB149c561eb8a95dAbe48ADefF326C3aa99b');
// insert into address (address) values ('0x768D20ed9f1edF011af5E04A6Ce1DE4241601F50');
// insert into address (address) values ('0x82892a206aaF0Af784924e1C42CA88d372380B63');
// insert into address (address) values ('0x1Fc44A660844A2C5f4cD0BF6E0191645DF51DdDb');
// insert into address (address) values ('0x42b9310b976A295a1cD39B31fCb440264140843e');
// insert into address (address) values ('0xbd4C50BaA08FF406e8f3C74F9F2A41C6f4B19F02');
// insert into address (address) values ('0x3F617f1d1b606dD1215b99acB69984AC93e4A7ea');
// insert into address (address) values ('0x802A9Dec5904945d975F8e28d02458a6c59032D2');
// insert into address (address) values ('0x2E93452593E4a2d7b73517CA1ABbe999Fd36255B');
// insert into address (address) values ('0x1ddd7014fd270bbC3f0fD1e93F5DE692911D930F');
// insert into address (address) values ('0x38482295e555bb903980eE63196157e8Ad6f05C7');
// insert into address (address) values ('0x7Adb377250bcad1c52e5d8C0861247d0C33E3a7f');
// insert into address (address) values ('0xF00998292Bee26770C7b5DDf173601e264106BE0');
// insert into address (address) values ('0x7F6bf94934f665e9a390A73B2F9A86F948Db22e0');
// insert into address (address) values ('0xDD0d37F1a14515c06a21dC4d069f24C89E95b0E1');
// insert into address (address) values ('0x95e52219ddBC242c808A200fc25F70B2B6cc4783');
// insert into address (address) values ('0x15b015F27720c7b77F0AEF93a345c429baC62c27');
// insert into address (address) values ('0x19E6B593454280672d815a43b7d8049F385deC2b');
// insert into address (address) values ('0x3A71fbb39beC7665d0729D9bbE0203cd69fe9e52');
// insert into address (address) values ('0xD8E56153478aBBe91c23F35446220f391Bac8011');
// insert into address (address) values ('0xBa9c58d27f94a063c159ad8Ffc07620A77d013A4');

// 0x7F0Ec45d377164724723f6580189f41d923E7F20:0xcced03d21a413c4436313799ceebaa303eb3d698297978df8ad1f990dddc2cd1
// 0x0bD664F2aDa15E98F852FDe10a39647e278dCD79:0x3f064da37596ef5423e051ffbdd7e5e97bb5e14548b37029b8aa26b071ef89b6
