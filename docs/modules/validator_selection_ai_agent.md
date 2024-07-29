# Validator Selection AI Agent

## Compatibility

Currently supports smart election of CosmosHub network validators, other CosmosSdk-based networks are being tested, and plans to expand to other networks, such as EVM networks.
Currently supports smart election of CosmosHub network validators. Other CosmosSdk-based networks are being tested, with plans to expand to EVM networks in the future.


## Install Build Tools

To set up the development environment, you need to install the following build tools:

Install `make`, `gcc` and `git`

```bash
sudo apt update
sudo apt install -y make gcc git build-essential
```

### Go

Install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, for example:

```bash
cd $HOME
wget -O go1.22.5.linux-amd64.tar.gz https://go.dev/dl/go1.22.5.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.5.linux-amd64.tar.gz && rm go1.22.5.linux-amd64.tar.gz
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export GO111MODULE=on' >> $HOME/.bashrc
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc && . $HOME/.bashrc
go version
```

### Python3

Install Python3 and pip:

### Python3

Install Python3 and pip:

```bash
sudo apt update
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.12
python3 --version # Verify Installation
```

## Install Validator Selection AI Agent

### API & Syncer Service (Golang)

API and blockchain data accumulation service used to provide validator election

```bash
$ git clone git@github.com:stafiprotocol/staking-election-cosmos.git
$ cd staking-election-cosmos
$ make build
```

#### Create working directory and config file

Working directory stores config

```bash
$ mkdir -p ~/staking-election-cosmos
$ cp config_api_example.toml ~/staking-election-cosmos/config_api.toml
$ cp conf_election_syncer.example.toml ~/staking-election-cosmos/conf_election_syncer.toml
```

Config staking-election-cosmos api service

```toml
logFilePath = ""

[apiServer]
listenAddr = "127.0.0.1:8085"
agentEndpoint = "http://127.0.0.1:6000" # The Validator Selection AI Agent API is the API of the python service that will be deployed below
ginMode= "release" # debug/release/test

[pinata]
apikey = ""
```

Config staking-election-cosmos syncer service

```toml
logFilePath = ""

[[chainInfo]]
prefix = "cosmos" # network account prefix
startHeight = 0 # starting from the latest height.If you specify a height, synchronization starts from the specified height
endpointList = ["https://mainnet-rpc.wetez.io:443/cosmos/tendermint/v1/apikey"]
batchLimit=100 # The number of blocks synchronized each time, and the data will be updated to the Pinata IPFS service after the synchronization is completed


[pinata]
apikey = "" # Pinata API Key
```


#### Start staking-election-cosmos service

```bash
# start api
$ ./build/staking-election-cosmos start-api --config ~/staking-election-cosmos/config_api.toml
# start syncer
$ ./build/staking-election-cosmos start-election-cosmos --config ~/staking-election-cosmos/conf_election_syncer.toml
```

### LLM Agent (Python)

```bash
$ git clone git@github.com:stafiprotocol/llm-agent.git
$ cd llm-agent
```

#### Create config file (.env)

```bash
$ cp .env.example .env
```

``` env
OPENAI_API_KEY=
OPENAI_BASE_URL=
HUGGINGFACE_API_KEY=
HUGGINGFACE_BASE_URL=https://api-inference.huggingface.co/models
CLAUDE_API_KEY=
CLAUDE_BASE_URL=
LISTEN_PORT=6000
LISTEN_HOST="127.0.0.1"
LOG_LEVEL="DEBUG"
LOG_FORMAT="JSON"
LOG_SERVICE_NAME="llm_agent_app"
GEMINI_API_KEY=
```

#### Start llm-agent service

1. Create a virtual environment:

    ```bash
    python3 -m venv llm-agent
    ```

2. Activate the virtual environment:

    ```bash
    source llm-agent/bin/activate
    ```

3. Install the required packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Start the service:

    ```bash
    python3 app.py
    ```

#### Request API

```bash
curl --location --request POST 'http://127.0.0.1:8085/election/api/v1/selectedValidators' \
--header 'Content-Type: application/json' \
--data-raw '{
  "modelId": "gpt-4o",
  "resultNum": 5,
  "prefix": "cosmos"
}'
```