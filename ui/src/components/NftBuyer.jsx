import React, { useState, useEffect } from "react";

const NFTBuyerPage = () => {
  const [balance, setBalance] = useState(null);
  const [mintAmount, setMintAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [nftId, setNftId] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  // Fetch client account balance
  const fetchBalance = async () => {
    try {
      const response = await fetch("/api/clientAccountBalance");
      const data = await response.json();

      if (data.success) {
        setBalance(data.data.balance);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setMessage("Failed to fetch balance.");
    }
  };

  // Mint tokens
  const mintTokens = async () => {
    try {
      const response = await fetch("/api/mintTokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: mintAmount }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        fetchBalance();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error minting tokens:", error);
      setMessage("Failed to mint tokens.");
    }
  };

  // Buy NFT
  const buyNFT = async () => {
    try {
      const response = await fetch("/api/buyNFT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nftId,
          amount: buyAmount,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        fetchBalance();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error buying NFT:", error);
      setMessage("Failed to buy NFT.");
    }
  };

  // Initialize NFT Marketplace
  const initializeNFTMarketplace = async () => {
    try {
      const response = await fetch("/api/initializeNFTMarketplace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, symbol }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error initializing NFT marketplace:", error);
      setMessage("Failed to initialize NFT marketplace.");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">NFT Buyer Dashboard</h1>
      <p>
        Account Balance: {balance !== null ? `${balance} Tokens` : "Loading..."}
      </p>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Mint Tokens</h2>
        <input
          type="number"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          placeholder="Enter amount to mint"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={mintTokens}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Mint Tokens
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Buy NFT</h2>
        <input
          type="text"
          value={nftId}
          onChange={(e) => setNftId(e.target.value)}
          placeholder="Enter NFT ID"
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          value={buyAmount}
          onChange={(e) => setBuyAmount(e.target.value)}
          placeholder="Enter amount to pay"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={buyNFT}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Buy NFT
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Initialize NFT Marketplace</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter NFT Marketplace Name"
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter NFT Symbol"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={initializeNFTMarketplace}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Initialize Marketplace
        </button>
      </div>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default NFTBuyerPage;
