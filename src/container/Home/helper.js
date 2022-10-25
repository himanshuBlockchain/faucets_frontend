import Web3 from "web3";
import { faucet_ABI } from "./faucetABI";
import axios from "axios";
import InputDataDecoder from "ethereum-input-data-decoder";
// import { BigNumber, BigNumberish } from "@ethersproject/bignumber"; // for deploying issue
// import { formatFixed, parseFixed } from "@ethersproject/bignumber"; // for deploying issue
// import { parseUnits, formatUnits } from "@ethersproject/units"; // for deploying issue
import { formatUnits } from "@ethersproject/units";
import moment from "moment";

export const sendFaucet = async (beneficiary, amount, network) => {
  console.log(beneficiary, amount, network);
  // beneficiary ="0xBcE195d127cE562D435d624fF9338a999eAE2a49" // for deploying issue
  const web3 = new Web3(network.network_details.RPC_URL);
  const contractInstance = new web3.eth.Contract(
    faucet_ABI,
    network.network_details.FAUCET_SMART_CONTRACT
  );

  let myAddress = network.network_details.WALLET_ADDRESS;
  // let count = await web3.eth.getTransactionCount(myAddress); // for deploying issue
  var privateKey = network.network_details.WALLET_PRIVATE_KEY;

  // let amount = web3.utils.toHex(web3.utils.toWei("2")); //1 DEMO Token

  const gasLimit = await contractInstance.methods
    .transfer(beneficiary, amount)
    .estimateGas({ from: myAddress });

  const bufferedGasLimit = Math.round(
    Number(gasLimit) + Number(gasLimit) * Number(0.2)
  );

  const gasPrice = await web3.eth.getGasPrice();

  const tx = {
    from: myAddress,
    gasPrice: gasPrice,
    gasLimit: bufferedGasLimit,
    to: network.network_details.FAUCET_SMART_CONTRACT,
    value: "0x0",
    data: contractInstance.methods.transfer(beneficiary, amount).encodeABI(),
    // nonce: web3.utils.toHex(count),
  };
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  console.log(signedTx.transactionHash);
  let x = signedTx.rawTransaction || "";
  const transaction = await web3.eth.sendSignedTransaction(x);
  console.log(transaction);
};

// function convertProperWalletAddress(walletAddress) { // for deploying issue
//   return "0x" + walletAddress.slice(26);
// }

export const nativeTokenHistory = async (network) => {
  // const web3 = new Web3(network.network_details.RPC_URL); // for deploying issue
  const decoder = new InputDataDecoder(faucet_ABI);

  let output = [];
  let url = `${network.network_details.ETHERSCAN_BASE_URL}/api?module=account&action=txlist&address=${network.network_details.FAUCET_SMART_CONTRACT}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${network.network_details.ETHERSCAN_API}`;
  const result = await axios.get(url);
  console.log(result);
  console.log("METHODID", network.network_details.METHOD_ID_TRANSFER_FUNCTION);
  console.log("METHODIDNative", network);

  for (let index = 0; index < result.data.result.length; index++) {
    if (
      result.data.result[index].methodId ===
      network.network_details.METHOD_ID_TRANSFER_FUNCTION
    ) {
      let decodedData = decoder.decodeData(result.data.result[index].input);
      let timestamp = result.data.result[index].timeStamp;
      let time = new Date(Number(timestamp * 1000));
      // let time2 = new Date();

      // console.log("diff", moment(time));
      // console.log("diff", moment(time2));

      // var ms = moment(time2, "DD/MM/YYYY HH:mm:ss").diff(
      //   moment(time, "DD/MM/YYYY HH:mm:ss")
      // );
      // var d = moment.duration(ms);
      // // var s = d.format("hh:mm:ss");
      // console.log("diff", d);

      // var tempTime = moment.duration(d);
      // var y = tempTime.hours() + tempTime.minutes();
      // console.log("difff", tempTime.hours(), "minutes", tempTime.minutes());
      // let to_URL = "https://www.google.co.in/"
      output.push({
        from: result.data.result[index].from,
        to: result.data.result[index].to,
        to_recipient: `0x${decodedData.inputs[0]}`,
        value: `${convertToEther(decodedData.inputs[1])} ETH`,
        timestamp: moment(time).format("hh:mm DD-MM-YYYY"),
        txnhash: result.data.result[index].hash,
      });
    }
  }

  return output.reverse();
};

const convertToEther = (data, decimals) => {
  decimals = !!decimals ? decimals : 18;
  data = noExponents(data);
  return noExponents(formatUnits(data.toString(), decimals));
};

const noExponents = function (num) {
  var data = String(num).split(/[eE]/);
  if (data.length === 1) return data[0];

  var z = "",
    sign = num < 0 ? "-" : "",
    str = data[0].replace(".", ""),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";
    while (mag++) z += "0";
    // eslint-disable-next-line no-useless-escape
    return z + str.replace(/^\-/, "");
  }
  mag -= str.length;
  while (mag--) z += "0";
  return str + z;
};
