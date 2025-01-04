// imports
// async main
// main

const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleSotrageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying SimpleStorage...");
  const simpleStorage = await SimpleSotrageFactory.deploy();
  console.log(`Deploy contract to : ${simpleStorage.target}`);
  // console.log(network.config);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 6 confirmations...");
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(simpleStorage.target, []);
  }
  const currentValue = await simpleStorage.retrieve();
  console.log("Current value of the contract:", currentValue.toString());

  //update current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log("Updated value of the contract:", updatedValue.toString());
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
