var DPetitioner = artifacts.require("DPetitioner");
module.exports = function(deployer, network, accounts){
    deployer.deploy(DPetitioner, {from: accounts[0]})
};