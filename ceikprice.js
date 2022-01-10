console.log("#####  ceikprice start #####");
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
const Caver = require('caver-js')
const caver = new Caver(process.env.CEIK_RPC)

const ABI_CODE = JSON.parse('[{"inputs": [{"internalType": "contract Ceik","name": "_ceik","type": "address"},{"internalType": "contract CeikPool","name": "_pool","type": "address"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": true,"inputs": [],"name": "ceik","outputs": [{"internalType": "contract Ceik","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "pool","outputs": [{"internalType": "contract CeikPool","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "price","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}]'); 
const BYTECODE = '608060405234801561001057600080fd5b506040516105723803806105728339818101604052604081101561003357600080fd5b810190808051906020019092919080519060200190929190505050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050610492806100e06000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806316f0115b146100465780636c96d12914610090578063a035b1fe146100da575b600080fd5b61004e6100f8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61009861011e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100e2610143565b6040518082815260200191505060405180910390f35b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006102a16000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561020857600080fd5b505afa15801561021c573d6000803e3d6000fd5b505050506040513d602081101561023257600080fd5b81019080805190602001909291905050506102936305f5e100600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316102a690919063ffffffff16565b61032c90919063ffffffff16565b905090565b6000808314156102b95760009050610326565b60008284029050828482816102ca57fe5b0414610321576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061043d6021913960400191505060405180910390fd5b809150505b92915050565b600061036e83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250610376565b905092915050565b60008083118290610422576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103e75780820151818401526020810190506103cc565b50505050905090810190601f1680156104145780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858161042e57fe5b04905080915050939250505056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a265627a7a723158207de201cb4f47ae957d9af22bc4b5a2f01bbdb29baa7533310da60d949f31ae3264736f6c63430005110032' 
const contract = new caver.klay.Contract(ABI_CODE)
const helloContract = new caver.klay.Contract(ABI_CODE,'0x17e10666cf781c353fcf23464260fd450638bb99') 
helloContract.methods.price().call().then( data => { console.log(data) })

// const tokenAddress = "0x18814b01b5cc76f7043e10fd268cc4364df47da0";  // ceik
// const walletAddress = "0x00D917C0E0B273E3b51fa9C621271562B02800B4"; // account address : --> reel
// const contract = new caver.klay.Contract(minABI, tokenAddress);
// async function getBalanceCEIK() {
//   const result = await contract.methods.balanceOf(walletAddress).call(); // 
//   const format = caver.utils.convertFromPeb(caver.utils.hexToNumberString(result* 10000000000) ) ;
//   console.log("CEIK:"+format);
// }

// getBalanceCEIK();
