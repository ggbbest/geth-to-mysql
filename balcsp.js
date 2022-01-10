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
    case "CRO": tokenAddress = "0x907717C48ED27B7D3876Ee7B43489A381Fb199b9"; // CEO
    break;
    case "CSP": tokenAddress = "0xAa44E71f896b7470CDF1b45139820848679D5e87"; // CSP (CEIK SWAP)
    break;
    default : tokenAddress = "0x1d187BbeCeF8d7b1731339c301ab8354d4F0A50b"; // BCK (BlockChainKorea)
    break;
  }
  // const walletAddress = "0x0178791B2e27287911FD06FD2Ba28c77C0Db4B1c"; // 윈스톰 법사 C4EI
  const contract = new Web3Client.eth.Contract(minABI, tokenAddress);

  const result = await contract.methods.balanceOf(walletAddress).call(); // 
  const format = Web3Client.utils.fromWei(result); // 10
  console.log(format);
}
// getBalanceC4eiCont("BCK","0x0178791B2e27287911FD06FD2Ba28c77C0Db4B1c");
getBalanceC4eiCont("BCK","0xAd70df6Bd78734721F42CD8cCACe42b25D83Aa65");
getBalanceC4eiCont("BCK","0xA6B2cb6C363905eF324b1cF462F3677E4477ba00");
getBalanceC4eiCont("BCK","0x321076c847888870547072A9E9fFCcA64d44d41d");
getBalanceC4eiCont("BCK","0x98DdD9c3d5a96ec33864677a9E669aE044510567");
getBalanceC4eiCont("BCK","0x0eEA7CA12D4632FF1368df24Cb429dBEa17dD71D");
getBalanceC4eiCont("BCK","0x61f122164A57dD1604d8170C107bc763E423d265");

getBalanceC4eiCont("CRO","0xAd70df6Bd78734721F42CD8cCACe42b25D83Aa65");
getBalanceC4eiCont("CRO","0xA6B2cb6C363905eF324b1cF462F3677E4477ba00");
getBalanceC4eiCont("CRO","0x321076c847888870547072A9E9fFCcA64d44d41d");
getBalanceC4eiCont("CRO","0x98DdD9c3d5a96ec33864677a9E669aE044510567");
getBalanceC4eiCont("CRO","0x0eEA7CA12D4632FF1368df24Cb429dBEa17dD71D");
getBalanceC4eiCont("CRO","0x61f122164A57dD1604d8170C107bc763E423d265");

getBalanceC4eiCont("CSP","0xAd70df6Bd78734721F42CD8cCACe42b25D83Aa65");
getBalanceC4eiCont("CSP","0xA6B2cb6C363905eF324b1cF462F3677E4477ba00");
getBalanceC4eiCont("CSP","0x321076c847888870547072A9E9fFCcA64d44d41d");
getBalanceC4eiCont("CSP","0x98DdD9c3d5a96ec33864677a9E669aE044510567");
getBalanceC4eiCont("CSP","0x0eEA7CA12D4632FF1368df24Cb429dBEa17dD71D");
getBalanceC4eiCont("CSP","0x61f122164A57dD1604d8170C107bc763E423d265");
