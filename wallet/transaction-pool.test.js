const transactionPool = require('./transactionPool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', ()=>{
    let tp, wallet, transaction;
    beforeEach(()=>{
        tp = new transactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet,"r4nd0m-4drr355", 30);
        tp.updateOrAddTransaction(transaction);

       
    });

    it('transactionpool adds transactions', ()=>{
        expect(tp.transactions.find(t => t.id === transaction.id))
        .toEqual(transaction);
    });
    it('updates a transaction in the pool', ()=>{
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet,"fooaddress", 40);
        tp.updateOrAddTransaction(newTransaction);

        expect(JSON.stringify(tp.transactions.find(t=>t.id === newTransaction)))
        .not.toEqual(oldTransaction);
    });
});