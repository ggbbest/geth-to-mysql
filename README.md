# gethtomysql
Basic nodejs to import ethereum blockchain from a geth node to mysql  
Edit sql queries in source.js to adapt them to your mysql db  
You need the genesis block with id 0 in your blocks table  
If you want to restart the import, just delete all blocks from the db and leave the genesis block
  
```
nvm install v14.18.1
nvm install v16.13.0
npm start

node block.js     --> block save to db
node address.js   --> address save to db
node create_address.js   --> address save to db
node addressimp.js
node balance.js
cd /home/dev/www/geth-to-mysql
node block.js

cd /home/dev/www/geth-to-mysql
node cr_address_klay
node balbck

node address /home/dev/www/geth-to-mysql/address/address1001.txt

```
docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'  c4ei2dbsrc_idx-database_1
172.21.0.2

caver.utils.convertFromPeb(caver.utils.hexToNumberString(result));
https://ko.docs.klaytn.com/bapp/sdk/caver-js/api-references/caver.utils
web3.utils.toWei(txt_to_amt,'ether')
caver.utils.convertToPeb(number ,"KLAY")

caver.klay.


When synced, it listens for new blocks and add them to the database.  
It supports blocks data, txs, address balances and tx history. 

## PostgreSQL  

psql.py is for postgre, with web3 ipc provider. It is more than 50x faster in the import and it can stay behind a private network with 1s block time.  
This can be used for a high performance explorer, it is currently tested on an explorer made with Django, CitusDB and a blockchain with 1s block time. It is handling more than 500k blocks with an average of 25 transactions per block

## Notes
It automatically skips empty block, but you can easily disabling this in the syncblock function
