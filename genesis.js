

var $ = require("./utils");
var Hash = require('multi-hashing');

var defaults = {
    //the (unix) time when the genesisblock is created
    time: Math.round((new Date()).getTime() / 1000),
    //the pszTimestamp found in the coinbase of the genesisblock
    timestamp: "Don't work for weekends, work for our goals.",
    //the first value of the nonce that will be incremented when searching the genesis hash
    nonce: 1,
    //the PoW algorithm: [x11|x13|x15|geek|quark|keccak|qubit|neoscrypt|lyra2re...]
    algorithm: 'geek',
    //the pubkey found in the output script
    pubkey: '04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f',
    //the value in coins for the output, full value (exp. in bitcoin 5000000000 - To get other coins value: Block Value * 100000000)
    value: 5000000000,
    //the target in compact representation, associated to a difficulty of 1
    bits: 0x1e0ffff0,
    locktime: 0
}

const argv = require('yargs')
    .alias('t', 'time')
    .alias('z', 'timestamp')
    .alias('n', 'nonce')
    .alias('a', 'algorithm')
    .alias('p', 'pubkey')
    .alias('v', 'value')
    .alias('b', 'bits')
    .alias('l', 'locktime')
    .alias('h', 'help')
    .help()
    .command('*', 'create genesis block', () => { }, (argv) => {
        //console.log(argv);
        var options = Object.assign({}, defaults, argv);
        //console.log(options);

        var merkle_root = $.sha256d(createTx(options));
        var genesisblock = createBlock(merkle_root, options);
        console.log("---------------");
        console.log("algorithm: %s", options.algorithm);
        console.log("pzTimestamp: %s", options.timestamp);
        console.log("pubkey: %s", options.pubkey);
        console.log("bits: %s", options.bits);
        console.log("time: %s", options.time);
        console.log("merkle root hash: %s", $.reverseBuffer(merkle_root).toString('hex'));

        PoW(genesisblock, options);
        //console.log("genesis block: %s", genesisblock.toString('hex'));
        // console.log($.reverseBuffer(hash_merkle_root).toString('hex'));

    })
    .argv;


function createInputScript(options) {
    var tz = options.timestamp;
    var psz_prefix = tz.length > 76 ? '4c' : '';
    var script_prefix = '04ffff001d0104' + psz_prefix + Buffer.from(String.fromCharCode(tz.length)).toString('hex');
    return Buffer.from(script_prefix + Buffer.from(tz).toString('hex'), 'hex');
}

function createOutputScript(options) {
    return Buffer.from('41' + options.pubkey + 'ac', 'hex');
}


function createTx(options) {

    var input = createInputScript(options);
    var out = createOutputScript(options);

    var size = 4    // tx version
        + 1   // number of inputs
        + 32  // hash of previous output
        + 4   // previous output's index
        + 1   // 1 byte for the size of scriptSig
        + input.length
        + 4   // size of sequence
        + 1   // number of outputs
        + 8   // 8 bytes for coin value
        + 1   // 1 byte to represent size of the pubkey Script
        + out.length
        + 4;   // 4 bytes for lock time


    var tx = Buffer.alloc(size);
    var position = 0;
    tx.writeIntLE(1, position, true);
    tx.writeIntLE(1, position += 4, true);
    tx.write(new Buffer(32).toString('hex'), position += 1, 32, 'hex');
    tx.writeInt32LE(0xFFFFFFFF, position += 32, true);
    tx.writeIntLE(input.length, position += 4, true);
    tx.write(input.toString('hex'), position += 1, input.length, "hex");
    tx.writeInt32LE(0xFFFFFFFF, position += input.length, true);
    tx.writeIntLE(1, position += 4);
    tx.write(Buffer.from($.numToBytes(options.value)).toString('hex'), position += 1, 8, 'hex'); // 50 * coin
    tx.writeInt32LE(0x43, position += 8);
    //tx.write(input.toString('hex'), position += 1, input.length, "hex");
    tx.write(out.toString('hex'), position += 1, out.length, "hex");
    tx.writeIntLE(options.locktime, position += out.length);


    //console.log(tx.toString('hex'));

    return tx;

};


function createBlock(merkleRoot, options) {

    var block = Buffer.alloc(80);
    var position = 0;

    block.writeIntLE(1, position); //version  
    block.write(new Buffer(32).toString('hex'), position += 4, 32, 'hex'); //previousblockhash
    block.write(merkleRoot.toString('hex'), position += 32, 32, 'hex');
    block.writeInt32LE(options.time, position += 32);
    //block.write(Buffer.from($.numToBytes(options.time)).toString('hex'), position += 32, 4, 'hex');

    block.writeInt32LE(options.bits, position += 4);
    //block.write(Buffer.from($.numToBytes(options.bits)).toString('hex'), position += 4, 4, 'hex');

    block.writeIntLE(options.nonce, position += 4);

    return block;

};

function PoW(data, options) {

    console.log('Searching for genesis hash...');
    var nonce = options.nonce;

    //var target = $.numToBytes((options.bits & 0xffffff) * 2 ** (8 * ((options.bits >> 24) - 3)));
    // console.log('' + target.toString('hex'));    

    while (true) {

        var hash = $.reverseBuffer(Hash[options.algorithm](data)).toString('hex');
        // var hash2 = $.reverseBuffer(hash).toString('hex');
        // var val = parseInt(hash2, 16);

        if (hash.match(/^00000/)) {
            console.log("nonce: %s", nonce);
            console.log("genesis hash: %s", hash);
            return;
        } else {

            nonce += 1;
            // if (nonce % 2000 == 0) {
            //     console.log("nonce: %s | hash: %s ", nonce, hash.toString('hex'));
            // }
            data.writeInt32LE(nonce, data.length - 4);
        }

    }

}