require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/LP-QFd64UWJ59KYONu4KlpaiYs8C6Hfe',
      accounts: ['35fec37adf080e0811c81db75d4bced710ebee1baa5487f28197ee13ac13ff2b'],
      
    },
  },
};
