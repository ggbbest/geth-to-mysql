console.log("#####  balbck balance start #####");

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
const Web3 = require("web3");
const provider = "http://192.168.1.185:21004"
const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

// The minimum ABI required to get the ERC20 Token balance
const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];
async function getBalanceC4eiCont(tokenName, walletAddress) {
  var  tokenAddress = "";
  switch (tokenName) {
    case "BCK": tokenAddress = "0x1d187BbeCeF8d7b1731339c301ab8354d4F0A50b"; // BCK (BlockChainKorea)
    break;
    case "RNT": tokenAddress = "0x7E6af705dB981D0E391B4e063E39a6bbDF60e66f"; // RNT (RENTAL)
    break;
    case "DEOR": tokenAddress = "0x6335E94a01D21DA57e2AA5EBAdf1935A934A70EC"; // DEOR
    break;
    default : tokenAddress = "0x1d187BbeCeF8d7b1731339c301ab8354d4F0A50b"; // BCK (BlockChainKorea)
    break;
  }
  // const walletAddress = "0x0178791B2e27287911FD06FD2Ba28c77C0Db4B1c"; // 윈스톰 법사 C4EI
  const contract = new Web3Client.eth.Contract(minABI, tokenAddress);

  const result = await contract.methods.balanceOf(walletAddress).call(); // 
  let format = Web3Client.utils.fromWei(result); // 10
  if (tokenName=="DEOR"){
    format = format * 1000000000;  // 
  }
  console.log(format);
}
getBalanceC4eiCont("BCK","0x0178791B2e27287911FD06FD2Ba28c77C0Db4B1c");
getBalanceC4eiCont("DEOR","0x66eC272Cf68967Ff821dB6Fd5AB8AE2Ed35014E4");
