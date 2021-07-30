// IMPORT LIBRARIES
const mongoose = require('mongoose');

// SCHEMA
const Transaction = mongoose.model('transaction', new mongoose.Schema({
  height: String,
  txhash: String,
  code: Number,
  raw_log: String,
  logs: [{
    msg_index: Number,
    success: Boolean,
    log: String,
    events: [{
      type: {
        type: String
      },
      attributes: [{
        key: String,
        value: String,
      }, ]
    }, ]
  }],
  gas_wanted: String,
  gas_used: String,
  tx: {
    type: {
      type: String
    },
    value: {
      msg: [{
        type: {
          type: String
        },
        value: {
          from_address: String,
          to_address: String,
          amount: [{
            denom: String,
            amount: String
          }]
        }
      }],
      fee: {
        amount: [{
          denom: String,
          amount: String
        }],
        gas: String
      },
      signatures: [{
        pub_key: {
          type: {
            type: String
          },
          value: String
        },
        signature: String
      }],
      memo: String
    }
  },
  timestamp: String,
  events: [{
    type: {
      type: String
    },
    attributes: [{
      key: String,
      value: String,
    }, ]
  }, ]
}));
module.exports = {
  Transaction
}