const Block = require('./block');
const Blockchain = require('./index');


describe('Blockchain', ()=>{
	let bc;
	let bc2;

	beforeEach(()=>{
		bc = new Blockchain();
		bc2 = new Blockchain();
	}); 
	it("expects first block to match genesis", () =>{
		expect(bc.chain[0]).toEqual(Block.genesis());
	});
	it("expects data of last to match ",()=>{
		const data = "foo";
		bc.addBlock(data);
		expect(bc.chain[bc.chain.length-1].data).toEqual(data);
	});

	it("validates a valid chain", ()=>{
			bc2.addBlock('foo');

			expect(bc.isValidChain(bc2.chain)).toBe(true);
	});

	it("invalidates a chain with a corrupt genesis block", ()=>{
		bc2.chain[0].data = 'bad data';

		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it("invalidates a corrupt chain", () => {
		bc2.addBlock('foo');
		bc2.chain[1].data = "not foo";
		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it("validates new chain", () =>{
		bc2.addBlock("goo");
		bc.replaceChain(bc2.chain);

		expect(bc.chain).toEqual(bc2.chain);

	});


	it("validates new chain", () =>{
		bc2.addBlock("foo");
		bc2.chain[1].data = "not foo";
		bc.replaceChain(bc2.chain);
		expect(bc.chain === bc2.chain).toBe(false);
	});
});