const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock();
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let laimCoin = new Blockchain();
laimCoin.addBlock(new Block(1, "01/04/2021", {amount: 5}));
laimCoin.addBlock(new Block(2, "06/04/2021", {amount: 58}));

console.log(JSON.stringify(laimCoin, null, 4));
