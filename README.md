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
---------------
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
## quark
```js
node genesis -a quark
---------------
// result:
algorithm: quark
pzTimestamp: Don't work for weekends, work for our goals.
pubkey: 04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f
bits: 504365040
time: 1521539113
merkle root hash: f5239467dd2a9dd0fce7a3babc03c7985eab2229c62e3d5670375f305753c9cc
Searching for genesis hash...
nonce: 516895
genesis hash: 00000a560e5488e24c7b2d83a7fd1d707321d57d0b8aa8164f35c5e67ed3a0f0
```

## keccak
```js
nasa8x$ node genesis -a keccak -t 1521538330
---------------
algorithm: keccak
pzTimestamp: Don't work for weekends, work for our goals.
pubkey: 04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f
bits: 504365040
time: 1521538330
merkle root hash: f5239467dd2a9dd0fce7a3babc03c7985eab2229c62e3d5670375f305753c9cc
Searching for genesis hash...
nonce: 1509118
genesis hash: 0000040fceaa8f6eda22f0caecc8c59a6ed82012e640d1c77348e3bf6c8d706f
```