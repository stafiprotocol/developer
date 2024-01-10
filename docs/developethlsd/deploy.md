# How to deploy ETH LSD stack on Holesky

This guide provides a step-by-step script to deploy the ETH LSD stack, without knowing details about contracts and services. Read the documentation for comprehensive understandings of these components.

## Step 0: Prerequisites

To create your own LSD network you have to obtain the LSDNetworkFactory address. You can pick one of the following genesis address according to the Ethereum network to deploy.

### Genesis Contracts

### Mainnet

| Contract | Address |
| --- | --- |
| LsdNetworkFactory | 0xLATEST_ADDRESS_ON_MAINNET |

### Holesky testnet

| Contract | Address |
| --- | --- |
| LsdNetworkFactory | 0xF9bB59107e293951205cDEEf8B482F48F35E5CC1 |

## Step 1: Deploying Contracts

### Option 1 (recommended): Deploying contracts by using Etherscan Read/Write Contract Feature

Learn this feature at https://info.etherscan.com/how-to-use-read-or-write-contract-features-on-etherscan/

There are 2 account roles in a LSD network, you should prepare the following accounts before advancing:

- NetworkAdmin: only one account for creating and managing the network
- Voter: at least 3 accounts recommended for voting changes from Oracle(Beacon chain) to the network on chain

Navigate to https://holesky.etherscan.io/address/0xF9bB59107e293951205cDEEf8B482F48F35E5CC1#writeProxyContract

- Connect to your web3 wallet as a deployer
- Submit transaction to create your own LSD network

### Option 2: Deploying contracts from source code

There are 2 account roles in a lsd network, you should prepare the following accounts before advancing:

- networkAdmin: only one account for creating and managing the network
- voter: at least 3 accounts recommended for voting changes from Oracle(Beacon chain) to the network on chain

Clone the source code

```bash
$ git clone https://github.com/stafiprotocol/eth-lsd-contracts.git
$ cd eth-lsd-contracts
$ yarn
$ cp .env-example .env
$ vim .env
```
Config environment variables

| config | description | example value |
| --- | --- | --- |
| HOLESKY_RPC_URL | execution RPC endpoint | https://holesky.stafi.io |
| NETWORK_ADMIN_PRIVATE_KEY | private key of admin account |  |
| ACCOUNT_VOTER1 | address of voter |  |
| ACCOUNT_VOTER2 | address of voter |  |
| ACCOUNT_VOTER3 | address of voter |  |
| LSD_NETWORK_FACTORY_ADDRESS | network factory address |  |

```jsx
$  npx hardhat run ./script/create_new_lsd_network.js --network holesky  
ethers version: ethers/5.7.2
network admin account address:   0xa9b8af5C53E6282fB469297091A33B08B5AC40B7
voter1 address:  0x68146ebA486CE6F8D22731c8ECB4d013F34E7114
voter2 address:  0x5b01439ab024Ba75B7B1f9c05aB55fa25e402809
voter3 address:  0xC82754C11eA7f1a901D331aaBdDf6C968044CB38
ContractLsdNetworkFactory address:       0x7EA9DE3d1885A8017E4327Af1d7Fe8926603ea91
LSDTokenAddress address:         0xd27A163B08814eaa6F5ad7B0a06e2AFBcc8807d5
FeePoolAddress address:          0xcaDDA21ab5d02556437D2210Eab97A14572F0EF4
NetworkBalancesAddress address:  0xe46B1fbc0cebD9818AB806B58cfB6979e176Ef12
NetworkProposalAddress address:  0x183fE0eDfB3bB42e96952dcA8180A1De64c19B76
NodeDepositAddress address:      0x801e3284e79a3aDA251C33f4Fc78e4BA2C77A390
UserDepositAddress address:      0x6E4Ca40069d3497dfd1E2fAB0862476002409cc9
NetworkWithdrawAddress address:  0xF4536d886f722AB8894d3A7F830ec2Bd9d950aA4
```

## Step 2: Installing Relay Service

### Install Build Tools

Install `make`, `gcc` and `git`

```bash
sudo apt update
sudo apt install -y make gcc git build-essential
```

Install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, for example:

```bash
cd $HOME
wget -O go1.20.3.linux-amd64.tar.gz https://go.dev/dl/go1.20.3.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.20.3.linux-amd64.tar.gz && rm go1.20.3.linux-amd64.tar.gz
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export GO111MODULE=on' >> $HOME/.bashrc
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc && . $HOME/.bashrc
go version
```

### Install relay service

```bash
$ git clone https://github.com/stafiprotocol/eth-lsd-relay.git
$ cd eth-lsd-relay
$ make install
```

### Create relay working directory and config file

```bash
$ mkdir -p ~/eth-stack
$ cp conf.template.toml ~/eth-stack/config.toml
```

### Config eth relay service

Update config (config.toml) by your favorite editor according to [Relay Config](https://github.com/stafiprotocol/stack-docs/blob/main/eth/relay.md#config)

```toml
eth1Endpoint = "http://127.0.0.1:8545"
eth2Endpoint = "https://holesky-beacon.stafi.io"
storageApiToken = "000000000000000000000000000000000000.1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111.22222222222222222222222-333333--44444444444"
account = "0x68146ebA486CE6F8D22731c8ECB4d013F34E7114"
gasLimit = "3000000"
maxGasPrice = "60000000000"                            #wei
batchRequestBlocksNumber = 32

[contracts]
lsdTokenAddress = "0x549aF761C1c72f3cd2Be966e76B778339Bf746DD"
lsdFactoryAddress = "0xe2CF966b041904eFfb8Fe83E317CAF4dd27d8CBc"
```

### Import voter accounts

Let's import your 3 voter accounts so that it can be used by relay service

```bash
$ eth-lsd-relay import-account --base-path ~/eth-stack
Enter private key:
>
password for key:
>
INFO[0007]
key imported address=0x68146ebA486CE6F8D22731c8ECB4d013F34E7114
file=CWD/keys/0x68146ebA486CE6F8D22731c8ECB4d013F34E7114.key
```


### Start relay services

```bash
$ eth-lsd-relay start --base-path ~/eth-stack
Enter password for key ./keys/0x68146ebA486CE6F8D22731c8ECB4d013F34E7114.key:
>

INFO[2023-10-27T14:51:08+08:00] update balances epochs                        
distributePriorityFeeDuEpochs=225 
distributeWithdrawalsDuEpochs=225 
merkleRootDuEpochs=225 
submitBalancesDuEpochs=225
INFO[2023-10-27T14:51:08+08:00] nodeCommission rate: 0.05, platformCommission rate: 0.05
INFO[2023-10-27T14:51:12+08:00] start services...
INFO[2023-10-27T14:51:12+08:00] start vote service
INFO[2023-10-27T14:51:12+08:00] start sync service
INFO[2023-10-27T14:52:43+08:00] synced block: 9935000
```