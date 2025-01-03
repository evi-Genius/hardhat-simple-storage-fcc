// imports
// async main
// main

const { ethers } = require("hardhat");

async function main() {
  const SimpleSotrageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying SimpleStorage...");
  const simpleStorage = await SimpleSotrageFactory.deploy();
  // await simpleStorage.deployed();
  console.log(`Deploy contract to : ${simpleStorage.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
