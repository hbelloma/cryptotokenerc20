//const ETBToken = artifacts.require('ETBToken.sol');
const DFeynmanCoin  = artifacts.require('DFeynmanCoin.sol');

module.exports = function (deployer) {
  deployer.deploy(ETBToken);
};
