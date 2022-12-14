// const Rinkeby_Faucet_Contract_Address =
//   "0x664b65F5FAA04e1f853592614E9c06b7B562c563";

const WALLET_ADDRESS = "0xa1B99900f27C6d9f6dD332ca9E91F98658A49589";
const WALLET_PRIVATE_KEY =
  "8677314f2246ca8ce6b0feb8e91f7ca25159ad9282401a17b54c7eb478097b96";

export const network_details = {
  ropsten: {
    NETWORK_CHAIN_NAME: "ropsten",
    NETWORK_NAME: "Ethereum Ropsten",
    NETWORK_ChainID: "3",
    RPC_URL: "https://ropsten.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    // FAUCET_SMART_CONTRACT: "0x6ec8B3f718EFb472b9D88F439bC6Ae2062cFCbc2",
    FAUCET_SMART_CONTRACT: "0x92be9d9193deacbcd0438c4d5026112637bb15fc",
    ETHERSCAN_API: "1F47QSXWFZYZ2A29H33UH7RRV6W61CH8WM",
    ETHERSCAN_BASE_URL: "https://api-ropsten.etherscan.io/",
    METHOD_ID_TRANSFER_FUNCTION: "0xa9059cbb",
    EXPLORER_BASE_URL_ADDRESS : "https://ropsten.etherscan.io/address/",
    EXPLORER_BASE_URL_TRANSACTION : "https://ropsten.etherscan.io/tx/"
  },
  kovan: {
    NETWORK_CHAIN_NAME: "kovan",
    NETWORK_NAME: "Ethereum Kovan",
    NETWORK_ChainID: "42",
    RPC_URL: "https://ropsten.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    FAUCET_SMART_CONTRACT: "",
    ETHERSCAN_API: "1F47QSXWFZYZ2A29H33UH7RRV6W61CH8WM",
    ETHERSCAN_BASE_URL: "https://api-kovan.etherscan.io/",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
  rinkeby: {
    NETWORK_CHAIN_NAME: "rinkeby",
    NETWORK_NAME: "Ethereum Rinkeby",
    NETWORK_ChainID: "4",
    RPC_URL: "https://rinkeby.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    // FAUCET_SMART_CONTRACT: "0x1cc1729dec8394a2ce2c65c0379cfc7ef9784541",
    FAUCET_SMART_CONTRACT: "0x0f32c192e039465246315123fad358bf875f6240",
    ETHERSCAN_API: "1F47QSXWFZYZ2A29H33UH7RRV6W61CH8WM",
    ETHERSCAN_BASE_URL: "https://api-rinkeby.etherscan.io/",
    METHOD_ID_TRANSFER_FUNCTION: "0xa9059cbb",
    EXPLORER_BASE_URL_ADDRESS : "https://rinkeby.etherscan.io/address/",
    EXPLORER_BASE_URL_TRANSACTION : "https://rinkeby.etherscan.io/tx/",
  },
  goerli: {
    NETWORK_CHAIN_NAME: "goerli",
    NETWORK_NAME: "Ethereum Goerli Testnet",
    NETWORK_ChainID: "5",
    RPC_URL: "https://goerli.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    FAUCET_SMART_CONTRACT: "",
    ETHERSCAN_API: "1F47QSXWFZYZ2A29H33UH7RRV6W61CH8WM",
    ETHERSCAN_BASE_URL: "https://api-goerli.etherscan.io/",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
  mumbai: {
    NETWORK_CHAIN_NAME: "mumbai",
    NETWORK_NAME: "Polygon Mumbai",
    NETWORK_ChainID: "80001",
    RPC_URL:
      "https://polygon-mumbai.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    ETHERSCAN_BASE_URL: "",
    FAUCET_SMART_CONTRACT: "",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
  "arbitrum-rinkeby": {
    NETWORK_CHAIN_NAME: "arbitrum-rinkeby",
    NETWORK_NAME: "Arbitrum Rinkeby",
    NETWORK_ChainID: "421611",
    RPC_URL:
      "https://arbitrum-rinkeby.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    ETHERSCAN_BASE_URL: "",
    FAUCET_SMART_CONTRACT: "",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
  "arbitrum-gorli": {
    NETWORK_CHAIN_NAME: "arbitrum-gorli",
    NETWORK_NAME: "Arbitrum Gorli",
    NETWORK_ChainID: "421613",
    RPC_URL:
      "https://arbitrum-goerli.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    ETHERSCAN_BASE_URL: "",
    FAUCET_SMART_CONTRACT: "",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
  near: {
    NETWORK_CHAIN_NAME: "near",
    NETWORK_NAME: "",
    NETWORK_ChainID: "",
    RPC_URL:
      "https://near-testnet.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    ETHERSCAN_BASE_URL: "",
    FAUCET_SMART_CONTRACT: "",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
  aurora: {
    NETWORK_CHAIN_NAME: "aurora",
    NETWORK_NAME: "Aurora Testnet",
    NETWORK_ChainID: "1313161555",
    RPC_URL:
      "https://aurora-testnet.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    ETHERSCAN_BASE_URL: "",
    FAUCET_SMART_CONTRACT: "",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
  palm: {
    NETWORK_CHAIN_NAME: "palm",
    NETWORK_NAME: "Palm Testnet",
    NETWORK_ChainID: "11297108099",
    RPC_URL:
      "https://palm-testnet.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    ETHERSCAN_BASE_URL: "",
    FAUCET_SMART_CONTRACT: "",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
  "optimism-kovan": {
    NETWORK_CHAIN_NAME: "optimism-kovan",
    NETWORK_NAME: "Optimism Kovan",
    NETWORK_ChainID: "69",
    RPC_URL:
      "https://optimism-kovan.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    ETHERSCAN_BASE_URL: "",
    FAUCET_SMART_CONTRACT: "",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
  "optimism-goerli": {
    NETWORK_CHAIN_NAME: "optimism-goerli",
    NETWORK_NAME: "Optimism Goerli Testnet",
    NETWORK_ChainID: "420",
    RPC_URL:
      "https://optimism-goerli.infura.io/v3/060691df70bc4bb5bf9ca36322fe8705",
    WALLET_ADDRESS: WALLET_ADDRESS,
    WALLET_PRIVATE_KEY: WALLET_PRIVATE_KEY,
    ETHERSCAN_BASE_URL: "",
    FAUCET_SMART_CONTRACT: "",
    METHOD_ID_TRANSFER_FUNCTION: "",
  },
};
