import { ethers } from "hardhat";

async function main() {
  // Retrieve the first account from Hardhat's network
  const [sender] = await ethers.getSigners();

  // Address to fund
  const recipientAddress = "0xC647810fF5e39ed03da39F0F8c154d6d0D5698C8";

  // Amount of Ether to send (in wei)
  const amountToSend = ethers.utils.parseEther("10"); // Adjust the value as needed

  // Send the transaction
  const tx = await sender.sendTransaction({
    to: recipientAddress,
    value: amountToSend,
  });

  // Wait for the transaction to be mined
  await tx.wait();

  console.log(`Transaction sent! Transaction hash: ${tx.hash}`);
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
