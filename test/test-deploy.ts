import { ethers } from "hardhat"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"
import { assert } from "chai"

describe(

    "Simple Storage",
    () => {
        let SimpleStorageFactory: SimpleStorage__factory
        let simpleStorage: SimpleStorage
        beforeEach(
            async () => {
                SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
                simpleStorage = await SimpleStorageFactory.deploy()
            }
        )

        it("should start with favorite number 0", async () => {
            const expectedValue = "0";
            const currentValue = await simpleStorage.getNumber()
            assert.equal(currentValue.toString(), expectedValue)
        })

        it(
            "should update upon store call",
            async () => {
                const expectedValue = "7"
                const store = await simpleStorage.store(7)
                store.wait(1)
                const updatedValue = await simpleStorage.getNumber()
                assert.equal(updatedValue.toString(), expectedValue)
            }
        )

    }

)