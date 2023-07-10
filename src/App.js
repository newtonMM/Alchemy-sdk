import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import React from "react-dom";
import ViewDetails from "./modals";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState([]);
  const [modal, setModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState([]);
  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());
    // console.log(await alchemy.core.getBlockNumber());
  }

  async function getTransactions() {
    if (blockNumber) {
      let response = await alchemy.core.getBlockWithTransactions(blockNumber);
      const { transactions } = response;
      setTransactions(transactions);

      console.log(transactions);
    }
  }

  useEffect(() => {
    getBlockNumber();
  }, []);

  useEffect(() => {
    getTransactions();
  }, [blockNumber]);

  async function ShowDetails(hash) {
    const response = await alchemy.core.getTransactionReceipt(hash);
    console.log(response);
    setTransactionDetails(response);
    console.log(transactionDetails);

    setModal(true);
  }

  async function confirmHandler() {
    setModal(false);
  }

  const transationDetails =
    transactions.length > 0 &&
    transactions.map((item, index) => {
      return (
        <div key={index} className="trnx">
          <p>Block Number :{item.blockNumber}</p>
          <p>Block hash :{item.hash}</p>
          <p>Block Nonce:{item.nonce}</p>
          <p>Block Hash :{item.blockHash}</p>
          <div
            className="btn-details"
            onClick={() => {
              ShowDetails(item.hash);
            }}
          >
            View Details
          </div>
        </div>
      );
    });

  return (
    <>
      {modal && (
        <ViewDetails
          blockHash={transactionDetails.blockHash}
          to={transactionDetails.to}
          from={transactionDetails.from}
          status={transactionDetails.status}
          onConfirm={confirmHandler}
        />
      )}
      <div className="App">Block Number: {blockNumber}</div>
      {transationDetails}
    </>
  );
}

export default App;
