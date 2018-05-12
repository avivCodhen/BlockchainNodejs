const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () =>{
	let transactions, wallet, recipient, amount;

	beforeEach(()=>{
		wallet = new Wallet();
		amount = 50;
		recipient = 'r3ci3pi3nt';
		transaction = Transaction.newTransaction(wallet, recipient, amount);
	});

	it('outpots the `amount` substracted from the wallet balance', ()=> {
		expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
		.toEqual(wallet.balance-amount);
	});

	it('outputs the `amount` added to the recipient', () =>{
		expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount)
	});
	
	it('inputs the balance of the wallet', ()=>{
		expect(transaction.input.amount).toEqual(wallet.balance);
	});
	it('validates a valid transaction',()=>{
		expect(Transaction.verifyTransaction(transaction)).toBe(true);
	});

	
	it('invalidates a corrupt transaction',()=>{
		transaction.outputs[0].amount = 50000;
		expect(Transaction.verifyTransaction(transaction)).toBe(false);
	});


	describe('updating a transaction', ()=>{
		let nextAmount, nextRecipient;

		beforeEach(()=>{
			nextAmount = 20;
			nextRecipient = "n3xt 4ddr3ss";
			transactions = transaction.update(wallet, nextRecipient, nextAmount);
		});

		
	it(`substracting the next amount fro, the sender's output`,()=>{
		expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
		.toEqual(wallet.balance-amount-nextAmount);
	});

	
	it('outputs an amount for the next recipient',()=>{
		expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
		.toEqual(nextAmount);
	});


	});
	it('',()=>{

	});


	it('',()=>{

	});


	describe('transaction with an amount that exceeds the balance', ()=> {
		beforeEach(()=>{
			newAmount = 5000000;
			transaction = Transaction.newTransaction(wallet, recipient, newAmount);
		});

		it('does not create the transaction', () =>{
			expect(transaction).toEqual(undefined);
		});
	});

});