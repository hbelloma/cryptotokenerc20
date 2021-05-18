pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract DFeynmanCoin is ERC20 {
  constructor() ERC20('DFeynman Coin', 'FEYN') {
    _mint(msg.sender, 300000000 * 10 ** 8);
  }
}
