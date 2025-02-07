console.log("#####  cfmprice start #####");
const mysql = require('mysql');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const dotenv = require('dotenv');
dotenv.config();
const Caver = require('caver-js')
const caver = new Caver(process.env.CEIK_RPC)

// node cfmprice.js
// token CFM 0xb69430f2a2f33482036FC9109c217ec5df50C1c4
const ABI_CODE3 = JSON.parse('[{"constant": false,"inputs": [{"name": "account","type": "address"}],"name": "addPauser","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "spender","type": "address"},{"name": "amount","type": "uint256"}],"name": "approve","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "addr","type": "address"}],"name": "exclude","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "finishUpdatingMultiplier","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "addr","type": "address"}],"name": "include","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "pause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "renounceOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "renouncePauser","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "to","type": "address"},{"name": "amount","type": "uint256"}],"name": "transfer","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "amount","type": "uint256"}],"name": "Transfer","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "owner","type": "address"},{"indexed": true,"name": "spender","type": "address"},{"indexed": false,"name": "amount","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "account","type": "address"}],"name": "Paused","type": "event"},{"constant": false,"inputs": [{"name": "from","type": "address"},{"name": "to","type": "address"},{"name": "amount","type": "uint256"}],"name": "transferFrom","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": false,"name": "account","type": "address"}],"name": "Unpaused","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "account","type": "address"}],"name": "PauserAdded","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "account","type": "address"}],"name": "PauserRemoved","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": false,"inputs": [],"name": "unpause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_addresses","type": "address[]"}],"name": "updateMultiplier","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "_userInfo","outputs": [{"name": "lastBalance","type": "uint256"},{"name": "lastMultiplier","type": "uint256"},{"name": "resettingCount","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "accMultiplier","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "user","type": "address"},{"name": "spender","type": "address"}],"name": "allowance","outputs": [{"name": "remaining","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "user","type": "address"}],"name": "balanceOf","outputs": [{"name": "balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "decimals","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "DECIMALS","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "excluded","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "isOwner","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "account","type": "address"}],"name": "isPauser","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "name","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "NAME","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "paused","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "resettingCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SYMBOL","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TOTAL_SUPPLY","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}]'); 
const rtnCtract3 = new caver.klay.Contract(ABI_CODE3,'0xb69430f2a2f33482036FC9109c217ec5df50C1c4') 
rtnCtract3.methods.symbol().call().then( data3 => { console.log(data3) })

// pool price
const ABI_CODE = JSON.parse('[{"inputs": [{"internalType": "contract Ceik","name": "_ceik","type": "address"},{"internalType": "contract CeikFMPool","name": "_pool","type": "address"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": true,"inputs": [],"name": "ceik","outputs": [{"internalType": "contract Ceik","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "pool","outputs": [{"internalType": "contract CeikFMPool","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "price","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}]'); 
const rtnCtract = new caver.klay.Contract(ABI_CODE,'0x907717C48ED27B7D3876Ee7B43489A381Fb199b9') 
rtnCtract.methods.price().call().then( data2 => { console.log(data2) })

// // pool ceikfmpool :  0xCdA0204927fC9Ffd61D8E1Ae4C30e08b9C0e5478

// rtnCtract2.methods.addLiquidity().call().then( data => { console.log(data) })
// rtnCtract2.methods.swapToKlay(caver.utils.toPeb('0.1', 'KLAY')).call().then( data => { console.log(data) })
// rtnCtract2.methods.swapToCFM().call().then( data => { console.log(data) })
// rtnCtract2.methods.swapToCFM(caver.utils.toPeb('0.1', 'KLAY')).call().then( data => { console.log(data) })

// ############## await CeikFMPoolContract.swapToCFM( utils.parseEther(this.buyInput.domElement.value) );
async function setKLAY2CFM(amt){
  const ABI_CODE2 = JSON.parse('[{"constant": false,"inputs": [],"name": "addLiquidity","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "swapToCFM","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "amount","type": "uint256"}],"name": "swapToKlay","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [{"name": "_cfm","type": "address"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "user","type": "address"},{"indexed": false,"name": "amount","type": "uint256"}],"name": "SwapToCFM","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "user","type": "address"},{"indexed": false,"name": "amount","type": "uint256"}],"name": "SwapToKlay","type": "event"},{"constant": true,"inputs": [],"name": "cfm","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}]'); 
  // const rtnCtract2 = new caver.klay.Contract(ABI_CODE2,'0xCdA0204927fC9Ffd61D8E1Ae4C30e08b9C0e5478') 
  const Newcontract = async () => {
    let contract;
    try {
      contract = new caver.klay.Contract(ABI_CODE2, "0xCdA0204927fC9Ffd61D8E1Ae4C30e08b9C0e5478");
      // console.log(contract)	//	[1]
      return contract.methods;
    } catch (e) {
      // console.log(e);
    }
  };
  const contract = await Newcontract();
  // contract.swapToCFM(caver.utils.toPeb(amt, 'KLAY')).call().then( data => { console.log(data) })
  contract.swapToCFM(amt).call().then( data => { console.log(data) })
  
}

setKLAY2CFM("1");


// class CeikFMPoolContract extends Contract {
//   constructor() { super("0xCdA0204927fC9Ffd61D8E1Ae4C30e08b9C0e5478", ABI_CODE2); } //CeikFMPoolArtifact.abi
//   public async swapToCFM(value: BigNumber) { await this.runWalletMethodWithValue(value, "swapToCFM"); }
//   public async swapToKlay(amount: BigNumber) {
//       const owner = await Wallet.loadAddress();
//       if (owner !== undefined) {
//           if ((await CeikContract.allowance(owner, this.address)).lt(amount)) {
//               await CeikContract.approve(this.address, amount);
//               await new Promise<void>((resolve) => {
//                   setTimeout(async () => {
//                       await this.runWalletMethod("swapToKlay", amount);
//                       resolve();
//                   }, 2000);
//               });
//           } else {
//               await this.runWalletMethod("swapToKlay", amount);
//           }
//       }
//   }
// }
// export default new CeikFMPoolContract();

const receiverAddress = "0x7C720ca152B43fa72a24eCcd51ccDAFBF74A884e"; // CLIP
const senderAddress = "0x0011A1cad2cA5d23Fde3cc0DefB10e1a8C3Df0c4"; // 윈스톰 법사 CEIK
async function fn_unlockAccount_token(addr){
  let rtn_result = false;
  await caver.klay.personal.unlockAccount(addr, process.env.C4EI_ADDR_PWD, 500).then(function (result) {
    rtn_result = result;
    console.log('fn_unlockAccount_token result :' + result);
  });
  return await rtn_result;
}
