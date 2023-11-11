import {
  ethers, run, network
} from "hardhat"
import dotenv from 'dotenv'

dotenv.config(
  {
    path: "./.env"
  }
)

const main = async () => {

  const simpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
  )

  console.log("deploying simple storage factory")

  const simpleStorage = await simpleStorageFactory.deploy()
  const tx = simpleStorage.deploymentTransaction()
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await tx?.wait(6)
    await verify(await simpleStorage.getAddress(), []);
  }

  const currentValue = await simpleStorage.getNumber();
  console.log(currentValue.toString())

  const storeResponse = await simpleStorage.store(7)
  await storeResponse.wait(1)

  const updatedValue = await simpleStorage.getNumber();
  console.log(updatedValue.toString())

}

const verify = async (contractAddress: any, args?: any) => {
  console.log("verifying")
  try {
    await run(
      "verify:verify",
      {
        address: contractAddress,
        constructorArguments: args
      }
    )
  } catch (err: any) {
    if (err.message.toLowerCase().includes("already verified")) {
      console.log("already verified")
    } else {
      console.log(err)
    }
  }
}


main()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })