class Miner{
    constructor(blockchain, transactionPool, wallet, p2pserver){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pserver = p2pserver;
    }

    mine(){
        const validTransactions = this.transactionsPool.validTransactions();
        //include a reward for the miner
        //create a block consisting of the valid transactions
        //synchronize chains in the p2p with the data
        //clear the transaction pool
        //broadcast to every miner to clear their transactions pool
    }
}

module.exports = Miner;