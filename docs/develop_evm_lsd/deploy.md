# How to deploy Sei LSD stack

This guide provides a step-by-step script to deploy a Sei LSD project, without deep understanding of contracts and services. Read the documentation for comprehensive understandings of these components.

## Step1. Deploy your LSD network contracts

61 Lab have made [StaFi LSaaS](https://stack-app.stafi.io/) for project parties to deploy their LSD network contracts.

![](/image/evm_lsd/choose-network-page.png "Choose Network Screenshot")

## Why LSD Token could not be changed?

As being the heart of the LSD network, LSD token must be stable, reliable and trustable. Users hold LSD Token as a receipt of staking so it could not be changed.

## Which Token Type should I choose?

Standard LSD Token:
- Provided by StaFi Stack
- ERC-20 compatible
- Ready to use

Several Procedures required before using Custom LSD Token:
1. Implement your own LST logic which comply with [Stack's standards](TBD: definition of LSD Token Standards).
2. Deploy your contract
3. For security reason, please request 61Lab for whitelisting your token 

## Parameter Tips

Owner Address: sets the owner of the LSD network being created.

Owner Permissions:
- Upgrade contracts
- Adjust commission fee
- Adjust duration of era
- Nominate voter manager
- Adjust parameters

Validator Number:
- How many validators you intend to set
- Highly recommend to set more than 1
- The more validators you set the more decentralized advantages the network gets
- Browse all active validators on [Testnet](https://seitrace.com/validators?chain=atlantic-2) or [Mainnet](https://seitrace.com/validators?chain=pacific-1)

## Rewards Distribution

Rewards distribution is crucial to project parties. Commission fee of users is set default as 10% and StaFi Stack fee is 10% of project income. for example, if `100Token` rewards received from Ethereum, the distribution will be:

| Role | Amount(Token) | Formula |
|---------------|--------|-------|
|  Users        |  90 | 100*(1-0.1)  |
|  Project      |  9  | (100-90)*(1-0.1)  |
|  StaFi Stack  |  1  | 100-90-9  |

## Save all the information generated

The LSD network has a set of smart contracts, so you should save all the information which you will interact frequently with, such as LSD App, and Relay service.

- LSD Network Factory address
- Owner address
- LSD Token address
- Stake Manager address
- Stake Pool address
- Validators address

## Step2. Run relay service

### Install Build Tools

Install `make`, `gcc` and `git`

```bash
sudo apt update
sudo apt install -y make gcc git build-essential
```

Install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, for example:

```bash
cd $HOME
wget -O go1.22.0.linux-amd64.tar.gz https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz && rm go1.22.0.linux-amd64.tar.gz
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export GO111MODULE=on' >> $HOME/.bashrc
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc && . $HOME/.bashrc
go version
```

### Install relay service

```bash
$ git clone https://github.com/stafiprotocol/evm-lsd-relay.git
$ cd evm-lsd-relay
$ make install
```

### Add or Import account

You can simply create a new account to submit transactions on neutron

```bash
$ evm-lsd-relay add-account 
config home: /home/ubuntu/.stafi/evm/lsd
keystore path: /home/ubuntu/.stafi/evm/lsd/keystore
password for key:
> 
INFO[2024-06-03T16:07:06+08:00] key added                                     address=0x04677765e9d5C1cc5Ad40e9AD8b56c441DdeF04C file=/home/ubuntu/.stafi/evm/lsd/keystore/0x04677765e9d5C1cc5Ad40e9AD8b56c441DdeF04C.key
```

Or you can import an exist account

```bash
$ evm-lsd-relay import-account 
config home: /home/ubuntu/.stafi/evm/lsd
keystore path: /home/ubuntu/.stafi/evm/lsd/keystore
Enter private key:
> 
password for key:
> 
INFO[2024-06-03T16:10:06+08:00] key imported                                  address=0xa9b8af5C53E6282fB469297091A33B08B5AC40B7 file=/home/ubuntu/.stafi/evm/lsd/keystore/0xa9b8af5C53E6282fB469297091A33B08B5AC40B7.key
```

⚠️Please make sure the account have enough gas funds, since relay will send transactions to StakeManager contract periodically.

### Start relay services

```bash
$ evm-lsd-relay start
  --account 0xa9b8af5C53E6282fB469297091A33B08B5AC40B7 \
  --endpoint 'http://localhost:8545' \
  --stake_manager <address of stake manager> \
  --log_level info
```

## Step3. Deploy your own LSD App
<a href="evm_lsd_app.html" target="_blank">Follow our doc to deploy your own LSD App</a>
