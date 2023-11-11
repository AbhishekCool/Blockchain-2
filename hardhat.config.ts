import { HardhatUserConfig } from "hardhat/config";
import dotenv from 'dotenv'
import 'hardhat-gas-reporter'
import "@nomicfoundation/hardhat-toolbox";
import './tasks/blockNumber'
import 'solidity-coverage'

dotenv.config(
  {
    path: "./.env"
  }
)


const config: HardhatUserConfig = {
  solidity: "0.8.8",
  networks: {
    "localhost": {
      url: process.env.LOCALHOST_RPC_URL as string,
      accounts: [
        process.env.LOCALHOST_PRIVATE_KEY as string
      ],
      chainId: 1337,
    },
    "sepolia": {
      url: process.env.SEPOLIA_RPC_URL as string,
      accounts: [
        process.env.SEPOLIA_PRIVATE_KEY as string,
      ],
      chainId: 11155111
    },
    "localhost-hardhat": {
      url: process.env.HARDHAT_RPC_URL as string,
      accounts: [
        process.env.HARDHAT_PRIVATE_KEY as string,
      ],
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    noColors: true,
    outputFile: "gasreport.txt",
    currency: "USD",
    coinmarketcap: process.env.COIN_MARKET_CAP_API,
    token: "MATIC"
  }
};

export default config;
