import React, { useState } from "react";

const NftSeller = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [isForSale, setIsForSale] = useState(false);
  const [price, setPrice] = useState("");
  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);

  const handleInitialize = async () => {
    try {
      const response = await fetch("/api/initializeNFTMarketplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, symbol }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error initializing:", error);
    }
  };

  const handleMintNFT = async () => {
    try {
      const response = await fetch("/api/mintNFT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId, tokenURI, isForSale, price }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  const fetchMintedNFTs = async () => {
    try {
      const response = await fetch("/api/getAllMintedNFTs");
      const data = await response.json();
      setMintedNFTs(data.data || []);
    } catch (error) {
      console.error("Error fetching minted NFTs:", error);
    }
  };

  const fetchListedNFTs = async () => {
    try {
      const response = await fetch("/api/listNFTsForSale");
      const data = await response.json();
      setListedNFTs(data.data || []);
    } catch (error) {
      console.error("Error fetching listed NFTs:", error);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">NFT Marketplace</h1>

      {/* Initialize Section */}
      <section className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Initialize NFT Marketplace</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Symbol"
            className="border p-2 w-full"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleInitialize}
          >
            Initialize
          </button>
        </div>
      </section>

      {/* Mint NFT Section */}
      <section className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Mint NFT</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Token ID"
            className="border p-2 w-full"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Token URI"
            className="border p-2 w-full"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={isForSale}
              onChange={(e) => setIsForSale(e.target.checked)}
            />
            Is for Sale
          </label>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleMintNFT}
          >
            Mint NFT
          </button>
        </div>
      </section>

      {/* List Minted NFTs */}
      <section className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">All Minted NFTs</h2>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
          onClick={fetchMintedNFTs}
        >
          Fetch All Minted NFTs
        </button>
        <ul className="space-y-2">
          {mintedNFTs.map((nft, index) => (
            <li key={index} className="border p-2 rounded">
              Token ID: {nft.tokenId} | URI: {nft.tokenURI}
            </li>
          ))}
        </ul>
      </section>

      {/* List NFTs for Sale */}
      <section className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">NFTs Listed for Sale</h2>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded mb-4"
          onClick={fetchListedNFTs}
        >
          Fetch NFTs for Sale
        </button>
        <ul className="space-y-2">
          {listedNFTs.map((nft, index) => (
            <li key={index} className="border p-2 rounded">
              Token ID: {nft.tokenId} | Price: {nft.price}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default NftSeller;
