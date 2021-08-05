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
    let count = 0
    let lowerLimit = 1;
    let upperLimit = 100000;
    let low = 0;
    let up = 0;
    let dbCheckCron = cron.schedule('*/1 * * * * *', async function () {
      if (done == true) {
        count+=1
        done = false
        let transaction = await Transaction.find();
        let node = await Node.find();
        let supply = await Supply.find();
        let txsError = 0
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
        
        let x=true
        let num = 1000
        let skipp = lowerLimit - 1
        let blockError = 0
        var length = 0
        while(x==true){
          let block = await Block.find().limit(num).skip(skipp)
          console.log(`Block.find().limit(${num}).skip(${skipp})`)
          if(!block){
            x=false
            console.log("BLOCK NOT FOUND")
          }
          else{
            if(length==0)
              low = block[0].block.header.height
            if(length==100000)
              up = block[block.length-1].block.header.height
            length+=block.length
            for(let i=0;i<block.length-1;i++){
              if(block[i].block.header.height!=block[i+1].block.header.height-1){
                console.log(`${block[i].block.header.height},${block[i+1].block.header.height}`)
                blockError+=1 
              }
            }
            if(block.length==num && length<=100000){
              skipp+=num
              block=[]
            }
              else{
                x=false
                upperLimit+=100000
                lowerLimit+=100000
              }
          }
        }
        function Records(length, error) {
          this.LENGTH = length;
          this.ERRORS = error;
        }
        let supplyRecord = new Records(supply.length, supplyError);
        let nodeRecord = new Records(node.length, nodeError);
        let blockRecord = new Records(`${low},${up}`, blockError);
        let txsRecord = new Records(transaction.length, txsError)
        console.table({'SUPPLY':supplyRecord, 'NODE':nodeRecord, 'BLOCK': blockRecord, 'TRANSACTION':txsRecord})
        done=true
               
      }
    });
  },
}