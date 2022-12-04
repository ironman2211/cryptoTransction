// https://eth-goerli.g.alchemy.com/v2/op7n09Ky3z5659yZLSgyjl2afiKVEiNV

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/op7n09Ky3z5659yZLSgyjl2afiKVEiNV",
      accounts: [
        "678aee6e2e6f540947169b928b677c9de843c8113dc2052cf5b8e63129c86b09",
      ],
    } ,
  },
};
