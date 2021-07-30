// IMPORT FILES
const {
  Supply
} = require("../model/supply");
const {
  Block
} = require("../model/block");
const {
  Node
} = require("../model/node");
const {
  Transaction
} = require("../model/transaction");

// IMPORT LIBRARIES
const cron = require("node-cron");
module.exports = {

  databaseCheck: function () {
    let done = true
    let dbCheckCron = cron.schedule('*/5 * * * * *', async function () {
      if (done == true) {
        done = false
        let transaction = await Transaction.find();
        let block = await Block.find().sort({
          _id: 1
        });
        let node = await Node.find();
        let supply = await Supply.find();
        txsError = 0
        if (!transaction){
          console.log("TX NOT FOUND")
          txsError+=1
        }
          

        if (!supply)
          console.log("SUPPLY NOT FOUND")
        else {
          supplyError = 0
          if (supply.length > 1) {
            supplyError += 1
          }
        }

        if (!node)
          console.log("NODE NOT FOUND")
        else {
          nodeError = 0
          if (node.length > 1) {
            nodeError += 1
          }
        }
        if (!block)
          console.log("BLOCK NOT FOUND")
        else {
          blockError = 0
          for (let i = 0; i < block.length - 1; i++)
            if (block[i].block.header.height != block[i + 1].block.header.height - 1) {
              blockError += 1
              console.log(block[i].block.header.height, "\t", block[i + 1].block.header.height)
            }
        }
        function Records(length, error) {
          this.LENGTH = length;
          this.ERRORS = error;
        }
        
        let supplyRecord = new Records(supply.length, supplyError);
        let nodeRecord = new Records(node.length, nodeError);
        let blockRecord = new Records(block.length, blockError);
        let txsRecord = new Records(transaction.length, txsError)
        
        console.table({'SUPPLY':supplyRecord, 'NODE':nodeRecord, 'BLOCK':blockRecord, 'TRANSACTION':txsRecord});

        done = true
      }
    });
  },
}