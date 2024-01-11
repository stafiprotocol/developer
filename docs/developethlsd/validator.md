# Validator

## Run validator manually

‼️**You MUST run ejector service, otherwise you may be slashed.**

### Run validator by Prysm

Please configure the fee recipient as the `FeePool` contract. You can find the `FeePool` contract address through `Factory` contract. For example:

More details about the configuration, you can check [here](https://docs.prylabs.network/docs/execution-node/fee-recipient).

It may take hours or days for your validator to become fully activated. To learn more about the validator activation process, see Deposit Process. See Check node and validator status for detailed status monitoring guidance. In the meantime, leave your execution client, beacon node, and validator client terminal windows open and running; once your validator is activated, it will automatically begin proposing and validating blocks.

To check on the status of your validator, we recommend checking out the popular block explorers: beaconcha.in by Bitfly and beaconscan.com by the Etherscan team.

### Run validator by third-party service provider SSV

ssv.network is a fully decentralized, open-source ETH staking network, based on Secret Shared Validator (SSV) technology, which enables the distributed operation of an Ethereum validator. The SSV protocol splits a validator key into multiple KeyShares and distributes them to non-trusting nodes run by operators. The nodes execute the validator's duties under a consensus mechanism providing fault tolerance, increased security, and decentralized risk for stakers.

More details on SSV portal: https://ssv.network/

**Note**: Please configure the fee recipient as the `FeePool` contract, otherwise you may be slashed.

### Run ejector service

‼️**You MUST run ejector service, otherwise you may be slashed.**

**Install Build Tools**

Install `make`, `gcc` and `git`

```
sudo apt update
sudo apt install -y make gcc git build-essential
```

Install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, for example:

```
cd $HOME
wget -O go1.21.6.linux-amd64.tar.gz https://go.dev/dl/go1.21.6.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.21.6.linux-amd64.tar.gz && rm go1.21.6.linux-amd64.tar.gz
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export GO111MODULE=on' >> $HOME/.bashrc
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc && . $HOME/.bashrc
go version
```

**Install ejector service**

```
$ git clone https://github.com/stafiprotocol/eth-lsd-ejector.git
$ cd eth-lsd-ejector
$ make install
```

**Start service**

| config | description | example value |
| --- | --- | --- |
| consensus_endpoint | Execution RPC endpoint | http://127.0.0.1:8545 |
| execution_endpoint | Consensus (Beacon chain) RPC endpoint | https://holesky-beacon.stafi.io |
| keys_dir | keystore path created by https://github.com/ethereum/staking-deposit-cli | ./validator_keys |
| withdraw_address | Contract address of NetworkWithdraw | 0x_NETWORK_WITHDRAW_CONTRACT_ADDR |

```
`$ eth-lsd-ejector start \
    --consensus_endpoint 'YOUR_BEACON_CHAIN_RPC_ENDPOINT' \
    --execution_endpoint 'YOUR_EXECUTION_RPC_ENDPOINT'  \
    --keys_dir ./validator_keys \
    --withdraw_address 0xYOUR_WITHDRAWAL_ADDRESS`
```

## Run validator by SSV client for trust validator

⚠️When use our SSV client service to run validators, you don't need to run an ejector service explicitly, cause it is embedded in the SSV client service.

### Install Build Tools

Install `make`, `gcc` and `git`

```
sudo apt update
sudo apt install -y make gcc git build-essential
```

Install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, for example:

```
cd $HOME
wget -O go1.21.6.linux-amd64.tar.gz https://go.dev/dl/go1.21.6.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.21.6.linux-amd64.tar.gz && rm go1.21.6.linux-amd64.tar.gz
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export GO111MODULE=on' >> $HOME/.bashrc
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc && . $HOME/.bashrc
go version
```

### Install SSV service

```
$ git clone https://github.com/stafiprotocol/eth-lsd-ssv.git
$ cd eth-lsd-ssv
$ make install
```

### Import trust node account

```
$ lsd-ssv-client import-account
keystore path: ./keys
Enter private key:
>
password for key:
>
INFO[0007] key imported                                  address=0x68146ebA486CE6F8D22731c8ECB4d013F34E7114 file=CWD/keys/0x68146ebA486CE6F8D22731c8ECB4d013F34E7114.key
```

### Import SSV account

```
$ lsd-ssv-client import-account
keystore path: ./keys
Enter private key:
>
password for key:
>
INFO[0007] key imported                                  address=0x68146ebA486CE6F8D22731c8ECB4d013F34E7114 file=CWD/keys/0x68146ebA486CE6F8D22731c8ECB4d013F34E7114.key
```

### Import validator mnemonic for creating new validators

```
$ lsd-ssv-client import-val-mnemonic
```

### Config eth lsd ssv client service

Update config (config.toml) by your favorite editor according to [SSV Config](https://github.com/stafiprotocol/stack-docs/blob/main/eth/ssv-client.md#config)

```
$ cp conf.ssv.template.toml config.toml
```

### Start ssv services

`$ lsd-ssv-client start --config config.toml`

## SSV Client

- Listen to whether there is enough ETH in the user pool. If so, automatically generate a new validator key, signature, deposit data, etc., based on the mnemonic, and interact with the node contract to stake ETH and become a validator.
- Monitor SSV-related events and calculate the cluster's latest state.
- Based on the configured operator, along with the validator key from step 1 and the cluster state from step 2, generate parameters such as signature, pubkeys, keyshare, etc., using SSV's related algorithms, and interact with the SSV contract to trigger RegisterValidator.
- Monitor the validator's status. If it exits, interact with the SSV contract to trigger RemoveValidator.
- Monitor the operator's status. If a switch is required, interact with the SSV contract to trigger RemoveValidator/RegisterValidator to switch to new operators.
- Monitor the cluster balance. If it approaches the liquidation value, interact with the SSV contract to trigger Deposit to avoid liquidation. If it has already been liquidated, trigger Reactivate to recover the cluster.
- Monitor the validator Ejected status. If an eject is needed, trigger ExitValidator on the beacon.
