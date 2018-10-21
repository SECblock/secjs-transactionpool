class SECTransactionPool {
  /**
   * create a transaction pool with config, such as transaction pool of token chain or transaction chain
   * @param {Object} config
   *
   */
  constructor (config) {
    this.config = config
    this.txBuffer = []
    this.txHashArray = []
    this.blockChainHashBuffer = {
      blockHashes: [],
      firstTimeUpdate: true,
      updateTime: ''
    }
  }

  /**
   * save the transaction into local transaction pool
   * @param {Object} transaction
   */
  addTxIntoPool (transaction) {
    if (this.txHashArray.indexOf(transaction.TxHash) < 0) {
      this.txBuffer.push(transaction)
      this.txHashArray.push(transaction.TxHash)
    }
  }

  /**
   * upate the block hash array
   * this blockChainHashBuffer is for checking the transaction in transaction pool, just compare the TxHash
   * @param {Object} BlockChain
   */
  updateBlockChainHashArray (BlockChain) {
    let blockchain = BlockChain.getBlockChain()
    blockchain.forEach(block => {
      block.Transactions.forEach(transaction => {
        let index = this.txHashArray.indexOf(transaction.TxHash);
        if (index > -1) {
          this.txHashArray.splice(index, 1);
          this.txBuffer.splice(index, 1);
        }
      })
    })
  }

  /**
   * upate the block hash array
   * this blockChainHashBuffer is for checking the transaction in transaction pool, just compare the TxHash
   * @param {Object} BlockChain
   */
  updateBlockHashArray (block) {
    block.Transactions.forEach(transaction => {
      let index = this.txHashArray.indexOf(transaction.TxHash);
      if (index > -1) {
        this.txHashArray.splice(index, 1);
        this.txBuffer.splice(index, 1);
      }
    })
  }

  /**
   * added by PPG
   * using for getting transaction status for user
   * @param {string} TxHash
   */
  getTxStatusByTxHash (TxHash) {
    let buffer = {}
    this.txBuffer.forEach((tx) => {
      if (tx.TxHash === TxHash) {
        buffer = tx
      }
    })
    return buffer
  }

  /**
   * added by PPG
   * using for getting transaction status for user
   * @param  {object} transaction
   */
  getTxStatusByTx (transaction) {
    let buffer = {}
    this.txBuffer.forEach((tx) => {
      if (tx.TxHash === transaction.TxHash) {
        buffer = tx
      }
    })
    return buffer
  }

  /**
   * return all transaction from pool
   * @return {Array}
   */
  getAllTxFromPool () {
    return this.txBuffer
  }

  /**
   * return all transaction from pool
   * @return {Array}
   */
  getTxHashArrayFromPool () {
    return this.txHashArray
  }

  /**
   * clear the transaction pool
   */
  clear () {
    this.txBuffer = []
    this.txHashArray = []
  }
}

module.exports = SECTransactionPool
