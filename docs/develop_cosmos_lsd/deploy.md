# How to deploy Cosmos LSD stack

This guide provides a step-by-step script to deploy the Cosmos LSD stack, without knowing details about contracts and services. Read the documentation for comprehensive understandings of these components.

# Neutron(ICS-27) LSD Stack

## Step1. Deploy your LSD network contracts

### Neutron Risks Awareness

tbd

### Parameter Tips

tbd

### Pool registration fee

tbd

## Rewards Distribution

Rewards distribution is crucial to project parties. Commission fee of users is set default as 10% and StaFi Stack fee is 10% of project income. for example, if `100ATOM` rewards received from Cosmos, the distribution will be:

| Role | Amount | Formula |
|---------------|--------|-------|
|  Users        |  90ATOM | 100ATOM*(1-0.1)  |
|  Project      |  9ATOM  | (100ATOM-90ATOM)*(1-0.1)  |
|  StaFi Stack  |  1ATOM  | 100ATOM-90ATOM-9ATOM  |

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
$ git clone https://github.com/stafiprotocol/neutron-lsd-relay.git
$ cd neutron-lsd-relay
$ make install
```

### Create relay working directory and config file

```bash
$ mkdir -p ~/cosmos-neutron-stack
$ cp config.template.toml ~/cosmos-neutron-stack/config.toml
```

### Config neutron relay service

Update config (config.toml) by your favorite editor according to [Relay Config](./relay.html#config)

```toml
endpointList = ["http://127.0.0.1:26657"]
gasPrice = "0.005untrn"
taskTicker = 60  # seconds
poolAddr = "cosmos1hvuhdvwnsuj487xdcsv4yntn3hlxsmlmp602z4jkq95c20fsp3cshuzjhg"
stakeManager = "neutron1rjr282qjnaeamsps4aspw8gmz4nynjpq6zurxfnppdcknpwdnxgs8rqm8y"
runForEntrustedPool = false

keyringDir = "/home/<your_user_name>/cosmos-neutron-stack/keyring"
keyringBackend = "file"
keyName = "demowallet1"
```

### Add or Import account

You can simply create a new account to submit transactions on neutron

```bash
$ neutron-lsd-relay keys add stafi-relay-1 \
    --keyring-backend=file --keyring-dir=~/cosmos-neutron-stack/keyring 
Enter keyring passphrase (attempt 1/3):

- address: neutron1c4ceejzxucas3sp5nvum4f8kr7pdun6wdw3y06
  name: stafi-relay-1
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Au3RxMxljL7CagnKcN/4j63KPRJjuCYhseeimwLVK9/3"}'
  type: local


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

youth stairs bronze tree melt coast grass table help lock road gospel quote explain usage retreat present now tragic course balance easy curtain this
```

Or you can import an exist account, let's say you have just exported from `neutrond` via `neutrond keys --home=$HOME_1 --keyring-backend=test export demowallet1  > demowallet1.privatekey`, you can import it to relay:

```bash
$ neutron-lsd-relay keys import demowallet1 demowallet1.privatekey \
    --keyring-backend=file --keyring-dir=~/cosmos-neutron-stack/keyring
Enter passphrase to decrypt your key:
Enter keyring passphrase (attempt 1/3):
Re-enter keyring passphrase:

$ neutron-lsd-relay keys list \
    --keyring-backend=file --keyring-dir=~/cosmos-neutron-stack/keyring 
Enter keyring passphrase (attempt 1/3):
- address: neutron1m9l358xunhhwds0568za49mzhvuxx9ux8xafx2
  name: demowallet1
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A/MdHVpitzHNSdD1Zw3kY+L5PEIPyd9l6sD5i4aIfXp9"}'
  type: local
```

⚠️Please make sure the account have enough NEUTRON funds, since relay will send transaction to StakeManager contract.

### Start relay services

```bash
$ neutron-lsd-relay start --base-path=~/cosmos-neutron-stack 
config path: /home/ubuntu/cosmos-neutron-stack/config.toml
load config success
log level: info
all logs are output in the /home/ubuntu/cosmos-neutron-stack/log_data directory
INFO[2024-02-23T12:02:30+08:00] cfg: &{EndpointList:[http://127.0.0.1:26657] TaskTicker:60 PoolAddr:cosmos1hvuhdvwnsuj487xdcsv4yntn3hlxsmlmp602z4jkq95c20fsp3cshuzjhg StakeManager:neutron1rjr282qjnaeamsps4aspw8gmz4nynjpq6zurxfnppdcknpwdnxgs8rqm8y GasPrice:0.005untrn LogFilePath:/home/ubuntu/cosmos-neutron-stack/log_data KeyringDir:/home/ubuntu/cosmos-neutron-stack/keyring KeyringBackend:file KeyName:demowallet1 RunForEntrustedPool:false} 
INFO[2024-02-23T12:02:30+08:00] task starting...
Enter keyring passphrase (attempt 1/3):
INFO[2024-02-23T12:02:36+08:00] start handlers                               
INFO[2024-02-23T12:02:36+08:00] success                                       action=NewEraUpdate newEra=84 pool=cosmos1hvuhdvwnsuj487xdcsv4yntn3hlxsmlmp602z4jkq95c20fsp3cshuzjhg targetEra=4647 txHash=010C675FFB313F7FD8B986D1A49688D510C61E9F3D804F4D2D5FF94AFCD13447
```

# Native CosmWasm LSD Stack

Coming Soon, Stay tuned
