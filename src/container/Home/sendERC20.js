import Web3 from "web3";
import { faucet_ABI } from "./faucetABI";


const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/e821ea96b5f24f01b1566e31f6879d80"
  )
);

const faucetContract = "0x664b65F5FAA04e1f853592614E9c06b7B562c563";


async function sendToken(recipientAddress) {
    const contractInstance = new web3.eth.Contract(faucet_ABI, faucetContract);

  // get transaction count, later will used as nonce

  let myAddress = "0xa1B99900f27C6d9f6dD332ca9E91F98658A49589";
  let count = await web3.eth.getTransactionCount(myAddress);
  var privateKey =
    "8677314f2246ca8ce6b0feb8e91f7ca25159ad9282401a17b54c7eb478097b96";

  let amount = web3.utils.toHex(web3.utils.toWei("2")); //1 DEMO Token

  const gasLimit = await contractInstance.methods
    .requestTokens(recipientAddress, amount)
    .estimateGas({ from: myAddress });
  const bufferedGasLimit = Math.round(
    Number(gasLimit) + Number(gasLimit) * Number(0.2)
  );

  const gasPrice = await web3.eth.getGasPrice();

  const tx = {
    from: myAddress,
    gasPrice: gasPrice,
    gasLimit: bufferedGasLimit,
    to: faucetContract,
    value: web3.utils.toWei('0.5', 'ether'),
    data: contractInstance.methods
      .requestTokens(recipientAddress, amount)
      .encodeABI(),
    // nonce: web3.utils.toHex(count),
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
console.log(signedTx.transactionHash)
  let x = signedTx.rawTransaction || "" ;
  // console.log(x);
  const transaction = await web3.eth.sendSignedTransaction(x);
  console.log(transaction)
}

sendToken();
