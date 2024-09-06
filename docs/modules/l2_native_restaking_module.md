# L2 Native Restaking Module

## Overview

The L2 Native Restake module is designed to facilitate ETH restaking across EVM chains, enabling seamless interactions between different blockchain networks. This project includes contracts for depositing, staking, and bridging assets, specifically focusing on ETH/wETH.

## Compatibility

- Supports all EVM chains compatible with Connext and Chainlink.
- Enables cross-chain asset transfers and staking operations.
- Used in conjunction with the CCIP Rate Cross-Chain Module to enable real-time retrieval of LRD exchange rates from L1 on L2.

## Contracts

### Introduction

L2 Native Restaking Module comprise several key components:

1. **XDeposit**: Handles deposits of ETH/WETH, minting of xLrd tokens, and bridging assets across chains.
2. **XStake**: Manages cross-chain staking operations, converting WETH to Lrd and wrapping it into xLrd.
3. **XERC20Factory**: Facilitates the deployment of xERC20 tokens and their associated lockboxes.
4. **XERC20Lockbox**: Provides a secure mechanism for locking xERC20 tokens.
4. **XERC20**: An ERC20 token implementation that supports minting and burning operations with configurable limits for bridges. It allows for the creation of tokens that can be minted and burned by authorized bridges, ensuring controlled supply and demand across chains.

These components can be deployed and used independently or in conjunction with one another.

Repository: [Evm Module Contracts](https://github.com/stafiprotocol/evm-module-contracts)

#### XDeposit

Includes the following functionalities:
- **Deposit ETH/WETH**: Users can deposit ETH, which is wrapped into WETH.
- **Mint xLrd Tokens**: Upon deposit, xLrd tokens are minted based on the amount of WETH deposited.
- **Bridge Assets**: Facilitates cross-chain transfers of assets using Connext.

#### XStake

Includes the following functionalities:
- **Receive WETH**: Accepts WETH from cross-chain transfers.
- **Stake ETH**: Converts WETH to Lrd by staking it.
- **Wrap Lrd into xLrd**: Wraps the staked Lrd into xLrd and burns the xLrd if already minted on L2.

#### XERC20Factory

Includes the following functionalities:
- **Deploy xERC20 Tokens**: Allows for the creation of xERC20 tokens with specified limits for minters and burners.
- **Deploy Lockboxes**: Facilitates the creation of lockboxes for managing xERC20 tokens.

#### XERC20Lockbox

Provides a secure environment for locking xERC20 tokens, ensuring that they are managed properly during cross-chain operations.

#### XERC20
The XERC20 contract is an ERC20 token implementation that allows for:
- **Minting and Burning**: Tokens can be minted for users and burned as needed, with operations restricted to authorized bridges.
- **Configurable Limits**: Each bridge can have its own minting and burning limits, which replenish over time, ensuring controlled token supply.

### Installation

#### Prerequisites
- Node.js
- Hardhat

#### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/stafiprotocol/evm-module-contracts.git
   cd connext
   ```

2. Install dependencies:
   ```bash
   yarn
   ```

3. Configure the network in `hardhat.config.js`:

4. Set up environment variables in `.env` file:

### Deployment

#### Deploying XERC20Factory and xLRD(L1+L2)

1. Deploy the `XERC20Factory` contract:
   ```bash
   npx hardhat run scripts/connext/deploy_XERC20Factory.js --network <your-network>
   ```

2. Deploy the `xLRD` contract in layer1 and layer2 using `XERC20Factory`:

   ```bash
   cp scripts/connext/config.example.json scripts/connext/config.json
   ```

   ```bash
   npx hardhat run scripts/connext/deploy_XERC20.js --network <your-network>
   ```

#### Deploying xLRDLockbox(L1)

1. Deploy the `xLRDLockbox` contract:
   ```bash
   npx hardhat run scripts/connext/deploy_XERC20Lockbox.js --network <your-network>
   ```

#### Deploying XDeposit(L2)

1. Deploy the `XDeposit` contract:
   ```bash
   npx hardhat run scripts/connext/deploy_xDeposit.js --network <your-network>
   ```

#### Deploying XStake(L1)

1. Deploy the `XStake` contract:
   ```bash
   npx hardhat run scripts/connext/deploy_xStake.js --network <your-network>
   ```

### Configuration

1. Configure the `XDeposit` contract:
   - Set the necessary parameters during initialization, including addresses for WETH, LRD, and Connext.
   - Information related to Connext contracts can be found here：[Connext](https://docs.connext.network/resources/deployments#contract-deployments)

2. Configure the `XStake` contract:
   - Ensure that the addresses for WETH, Lrd, xLrd, and the stake manager are correctly set.

3. Fund the contracts with necessary tokens for operations.

### Usage

#### Depositing Assets

1. Users can deposit ETH or WETH into the `XDeposit` contract, which will wrap ETH and mint xLrd tokens.
2. Call the `executeBridge` method to transfer assets across chains.

#### Staking Assets

1. The `XStake` contract will receive WETH from cross-chain transfers.
2. It will stake the WETH to receive Lrd and wrap it into xLrd.

## Off-Chain Relayer

The Off-Chain Relayer, also known as Connext-Relay, is a key component of the L2 Native Restaking Module. It is used to periodically trigger contract transactions for cross-chain staking from the XDeposit contract on L2 to L1. It facilitates communication between different chains and ensures the smooth execution of cross-chain operations.

### Installation

To install Connext-Relay:

```bash
make build
```

### Configuration

- Default home directory: `$HOME/connext-relay`
- Default log level: Info
- Custom home directory can be specified using the `--home` flag

### Key Features

1. **Account Management**:
   - Add new Ethereum accounts
   - Import existing Ethereum accounts

2. **Relay Service**:
   - Starts the relay service to periodically trigger cross-chain staking transactions from L2 to L1.

3. **Version Control**:
   - Check the version of Connext-Relay

### Usage

#### 1. Adding a New Ethereum Account

```bash
./build/connext-relay add-account
```

#### 2. Importing an Existing Ethereum Account

```bash
./build/connext-relay import-account
```

#### 3. Starting the Relay Service

First, create and edit the configuration file:

```bash
cp conf.template.toml config.toml
# Edit config.toml as needed
```

Then start the relay service:

```bash
./build/connext-relay start
```

#### 4. Checking Version

```bash
./build/connext-relay version
```

### Security Considerations

- Passwords for accounts should be kept secure
- Private keys are encrypted before storage
- Key files are created with 0600 permissions

### Integration with L2 Native Restaking Module

The Connext-Relay works in conjunction with the smart contracts to:

1. Relay messages and asset transfer instructions to destination chains
2. Facilitate the execution of cross-chain staking and unstaking operations

By running a Connext-Relay alongside the deployed smart contracts, operators can ensure smooth and secure cross-chain asset management within the L2 Native Restaking Module ecosystem.

For more detailed information or support, please contact the development team.