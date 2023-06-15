import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const [sender] = await ethers.getSigners();

  // Amount of Ether to send (in wei)
  const amountToSend = ethers.utils.parseEther("10"); // Adjust the value as needed

  // Send the transaction
  const tx1 = await sender.sendTransaction({
    to: "0xC647810fF5e39ed03da39F0F8c154d6d0D5698C8",
    value: amountToSend,
  });

  const tx2 = await sender.sendTransaction({
    to: "0xdFb6B4E0DabD40134c9E21f919bAD19C8DCa1B89",
    value: amountToSend,
  });

  // Wait for the transaction to be mined
  await tx1.wait();
  await tx2.wait();

  console.log(`Transaction1 sent! Transaction hash: ${tx1.hash}`);
  console.log(`Transaction2 sent! Transaction hash: ${tx2.hash}`);

  const { deployer } = await getNamedAccounts();

  await deploy("Doodl3NFT", {
    from: deployer,
    args: [],
    log: true,
  });
};
export default func;
