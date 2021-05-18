

//const Token = artifacts.require('ETBToken.sol');
//const Token = artifacts.require('TokenERC20.sol');
const Token = artifacts.require('DFeynmanCoin.sol');

contract('Token', accounts=> {
  let token;
  const [admin, _] = accounts;
  const TOTAL_SUPPLY = web3.utils.toWei('207542'); //ammount for airdrop

  before(async () => {
    token = await Token.new();
  });

  it('admin should have total supply', async () => {
    const totalSupply = await token.totalSupply();
    const balanceAdmin = await token.balanceOf(admin);
    assert(totalSupply.toString() === TOTAL_SUPPLY);
    assert(balanceAdmin.toString() === TOTAL_SUPPLY);
  });
});
