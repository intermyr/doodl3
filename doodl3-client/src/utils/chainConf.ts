import doodl3Deployment from "../../../deployments/localhost/Doodl3NFT.json";

interface ChainConfig {
  contractAddress: `0x${string}`;
}

const chainConf: ChainConfig = {
  contractAddress: import.meta.env.DEV
    ? (doodl3Deployment.address as `0x${string}`)
    : "0x6959dAc3b81d8a303d5bdb261097cfB6Cdd3a572",
};

export default chainConf;
