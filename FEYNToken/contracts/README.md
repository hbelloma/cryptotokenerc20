# FEYN Token Contracts  

The FEYN token is an [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) token with additional [ERC677](https://github.com/ethereum/EIPs/issues/677) functionality.
The total supply of the token is 300,000,000, and each token is divisible up to 8 decimal places.
To prevent accidental burns, the token does not allow transfers to the contract itself and to 0x0.

## Details
*	Address: 0x819C90B6158d22B872e004a415a14e1c2287298F 
*	Decimals: 8
*	Name: DFeynmanCoin
*	Symbol: FEYN

## Why an ERC20 + ERC677 token?
[ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) requires a multistep process for tokens to be transferred to a contract. First approve must be called on the token contract, enabling the contract to withdraw the tokens. Next, the contract needs to be informed that it has been approved to withdraw tokens. Finally, the contract has to actually withdraw the tokens, and run any code related to receiving tokens. This process typically takes two to three steps, which is inefficient and a poor user experience.
[ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) token standard is leading to money losses for end users. The main problem is lack of possibility to handle incoming [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) transactions (If you will send 100 ERC20 tokens to a contract that is not intended to work with ERC20 tokens, then it will not reject tokens because it cant recognize an incoming transaction. As the result, your tokens will get stuck at the contracts balance, some examples of ERC20 lost tokens at 27 Dec 2017 are: QTUM, $1,204,273 lost, EOS, $1,015,131 lost, GNT, $249,627 lost, STORJ, $217,477 lost, OMG, $149,941 lost), that were performed via transfer function of ERC20 token.
To prevent accidentally sends of tokens to contracts and make token transactions behave like ether transactions, the ERC223 token has been developed.

While [ERC223](https://github.com/ethereum/EIPs/issues/223) solves the described problem with its `transfer(address,uint256,bytes)` function, it opens other problems. [ERC223](https://github.com/ethereum/EIPs/issues/223) changes the behavior of ERC20's `transfer(address,uint256)`, specifying that it should throw if transferring to a contract that does not implement onTokenTransfer. 
This is problematic because there are deployed contracts in use that assume they can safely call `transfer(address,uint256)` to move tokens to their recipient. If one of these deployed contracts were to transfer an ERC223 token to a contract(e.g. a multisig wallet) the tokens would effectively become stuck in the transferring contract.

Then [ERC677](https://github.com/ethereum/EIPs/issues/677) arrives, this ERC aims to provide the helpful functionality of ERC223 without colliding with it. By giving contracts a reason to implement `onTokenTransfer` before [ERC223](https://github.com/ethereum/EIPs/issues/223) becomes widely implemented, a smooth transition is provided until a larger part of the Ethereum ecosystem is informed about and capable of handling [ERC223](https://github.com/ethereum/EIPs/issues/223) tokens. The function `transferAndCall` behaves similarly to `transfer(address,uint256,bytes)`, but allows implementers to gain the functionality without the risk of inadvertently locking up tokens in non-ERC223 compatible contracts. It is distinct from ERC223's transfer(address,uint256,bytes) only in name, but this distinction allows for easy distinguishability between tokens that are [ERC223](https://github.com/ethereum/EIPs/issues/223) and tokens that are simply ERC20 + ERC677.

## A Brief on Technicals
DFeynmanCoin.sol is defined in terms of the following contracts: 
*	`token/linkStandardToken.sol` (has the functions `transferFrom`, `approve`, `allowance`, `increaseApproval` and `decreaseApproval`; this is the basic of an ERC20 token plus the increase-decrease approval, and is a contract of the contract “class” `linkERC20`, `linkBasicToken`)
-	`token/linkBasicToken.sol` (define the functions `transfer`, `balanceOf`) which belongs to the contract “class” `linkERC20Basic.sol`)

(a)	`token/linkERC20Basic.sol` (declares `balanceOf`, `transfer`, `event Transfer`)

(b)	`token/vendor/SafeMath.sol` (defines the functions `add`, `sub`, `mul`, `div`, `mod`) 

-	`token/linkERC20.sol` (declares `allowance`, `transferFrom`, `approve`, `event Approval`)
*	`ERC677Token.sol` (defines the functions `transferAndCall`, `contractFallback`, `isContract`) and needs of:  
-	`token/ERC677.sol` (declares the functions `transferAndCall`, `event Transfer`, which belongs to a contract “class” `linkERC20.sol`)
-	`token/ERC677Receiver.sol` (declares the function `onTokenTransfer`)


## Installation
```
yarn install
```

## Testing
Run a test network:
```
./server.sh
```

Then, run the test suite:
```
truffle test
```
