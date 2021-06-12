var Trusts = artifacts.require("./Trusts.sol");

module.exports = function(deployer) {
    deployer.deploy(Trusts);
};
