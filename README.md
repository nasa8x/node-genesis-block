## Create Genesis Block Proof with Node.js


## setup

```js
git clone https://github.com/nasa8x/node-genesis-block.git genesis-block
cd genesis-block
npm install
```

## help

```js    
    Options:      
      -t TIME, --time=TIME  the (unix) time when the genesisblock is created
      -z TIMESTAMP, --timestamp=TIMESTAMP
         the pszTimestamp found in the coinbase of the genesisblock
      -n NONCE, --nonce=NONCE
         the first value of the nonce that will be incremented
         when searching the genesis hash
      -a ALGORITHM, --algorithm=ALGORITHM
         the PoW algorithm: [x11|neoscrypt|quark|qubit|keccak|lyra2re]
      -p PUBKEY, --pubkey=PUBKEY
         the pubkey found in the output script
      -v VALUE, --value=VALUE
         the value in coins for the output, full value (exp. in bitcoin 5000000000 - To get other coins value: Block Value * 100000000)
      -b BITS, --bits=BITS
         the target in compact representation, associated to a difficulty of 1
```


## algorithms
----------
* x11
* x13
* x15
* x16r
* nist5
* neoscrypt
* scrypt
* keccak
* quark
* bcrypt
* skein
* groestl
* groestlmyriad
* blake
* fugue
* qubit
* hefty1
* shavite3
* cryptonight
* boolberry
* yescrypt
* fresh


## x11

```js
node genesis -a x11 -z "Don't work for weekends, work for our goals - 18/Jan/2018." -p "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f"

// result:
algorithm: x11
pzTimestamp: Don't work for weekends, work for our goals - 18/Jan/2018.
pubkey: 04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f
bits: 504365040
time: 1521537891
merkle root hash: 77fc7d6cfbc4ec91703444a515955092d4b7c04dbb8f23be59deb42a39ec0057
Searching for genesis hash...
nonce: 1827816
genesis hash: 0000084e98003628c45719136940cf7068805f4024419a51d6259fb676c299da

```


## Genesis Block Proof of Work for Keccak Algorithms.

```js
python gen.py -a keccak -t 1517542208 -z "Don't work for weekends, work for our goals - 18/Jan/2018." -p "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f"

```

## Genesis Block Proof of Work for NeoScrypt Algorithms.

```js
python gen.py -a neoscript -t 1517542208 -z "Don't work for weekends, work for our goals - 18/Jan/2018." -p "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f"

```

## Genesis Block Proof of Work for Qubit Algorithms.

```js
python gen.py -a qubit -t 1517542208 -z "Don't work for weekends, work for our goals - 18/Jan/2018." -p "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f"

```

## Genesis Block Proof of Work for Quark Algorithms.

```js
python gen.py -a quark -t 1517542208 -z "Don't work for weekends, work for our goals - 18/Jan/2018." -p "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f"

```

## Genesis Block Proof of Work for Lyra2re Algorithms.

```js
python gen.py -a lyra2re -t 1517542208 -z "Don't work for weekends, work for our goals - 18/Jan/2018." -p "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f"

```
