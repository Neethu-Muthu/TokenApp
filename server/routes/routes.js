const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");




router.post("/api/initializeNFTMarketplace", async (req, res) => {
  try {
    const { name, symbol } = req.body;

    // Validate request body
    if (!name || !symbol) {
      return res.status(400).json({
        success: false,
        message: "Both 'name' and 'symbol' are required fields",
      });
    }

    // Create an instance of the client application
    const userClient = new clientApplication();

    // Call the chaincode initialization function
    const result = await userClient.submitTxn(
      "org1", 
      "mychannel", 
      "token",
      "NFTMarketplaceContract", 
      "invokeTxn", 
      "", 
      "Initialize",
      name,
      symbol
    );

    // Decode and return the result
    res.status(201).json({
      success: true,
      message: "NFT Marketplace chaincode initialized successfully!",
      data: { result: new TextDecoder().decode(result) },
    });
  } catch (error) {
    console.error("Error initializing NFT marketplace:", error);
    res.status(500).json({
      success: false,
      message: "Error initializing the NFT marketplace",
      data: { error: error.message },
    });
  }
});
router.post("/mintNFT", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { tokenId, tokenURI, listed, price } = req.body;

    if (!tokenId || !tokenURI || listed === undefined || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: tokenId, tokenURI, listed, price",
      });
    }

    let userClient = new clientApplication();

    const result = await userClient.submitTxn(
      "org1",
      "mychannel",
      "token",
      "NFTMarketplaceContract",
      "invokeTxn",
      "",
      "MintWithTokenURI",
      tokenId,
      tokenURI,
      listed.toString(),
      price.toString()
    );

    res.status(201).json({
      success: true,
      message: "NFT minted successfully!",
      data: { result: new TextDecoder().decode(result) },
    });
  } catch (error) {
    console.error("Error minting NFT:", error);
    res.status(500).json({
      success: false,
      message: "Error minting NFT",
      data: { error: error.message },
    });
  }
});

router.get("/getAllMintedNFTs", async (req, res) => {
  try {
    // Create a new client application instance
    let userClient = new clientApplication();

    // Call the submitTxn method to query all minted NFTs
    const result = await userClient.submitTxn(
      "org1", // Organization
      "mychannel", // Channel name
      "token", // Chaincode name
      "NFTMarketplaceContract", // Contract name
      "queryTxn", // Transaction type
      "", // Empty string (if not used in your chaincode)
      "GetAllMintedNFTs" // Function name
    );

    // Decode the result
    const decodedResult = new TextDecoder().decode(result);

    // Parse the decoded string into JSON
    const jsonResult = JSON.parse(decodedResult);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Fetched all minted NFTs successfully!",
      data: jsonResult,
    });
  } catch (error) {
    console.error("Error fetching minted NFTs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching minted NFTs",
      data: { error: error.message },
    });
  }
});

router.get("/listNFTsForSale", async (req, res) => {
  try {
    // Create a new client application instance
    let userClient = new clientApplication();

    // Call the submitTxn method to query all listed NFTs for sale
    const result = await userClient.submitTxn(
      "org1", // Organization
      "mychannel", // Channel name
      "token", // Chaincode name
      "NFTMarketplaceContract", // Contract name
      "queryTxn", // Transaction type
      "", // Empty string (if not used in your chaincode)
      "ListNFTsForSale" // Function name
    );

    // Decode the result
    const decodedResult = new TextDecoder().decode(result);

    // Parse the decoded string into JSON
    const jsonResult = JSON.parse(decodedResult);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Fetched all NFTs listed for sale successfully!",
      data: jsonResult,
    });
  } catch (error) {
    console.error("Error fetching NFTs listed for sale:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching NFTs listed for sale",
      data: { error: error.message },
    });
  }
});

router.get("/clientAccountBalance", async (req, res) => {
  try {
    // Create a new client application instance
    let userClient = new clientApplication();

    // Call the submitTxn method to query the client account balance
    const result = await userClient.submitTxn(
      "org2", // Organization
      "mychannel", // Channel name
      "token", // Chaincode name
      "NFTMarketplaceContract", // Contract name
      "queryTxn", // Transaction type
      "", // Empty string (if not used in your chaincode)
      "ClientAccountBalance" // Function name
    );

    // Decode the result
    const decodedResult = new TextDecoder().decode(result);

    // Parse the decoded result as JSON (if applicable)
    const balanceData = JSON.parse(decodedResult);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Client account balance retrieved successfully!",
      data: balanceData,
    });
  } catch (error) {
    console.error("Error retrieving client account balance:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving client account balance",
      data: { error: error.message },
    });
  }
});

router.post("/mintTokens", async (req, res) => {
  try {
    // Extract the amount of tokens to mint from the request body
    const { amount } = req.body;

    // Validate the input
    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required to mint tokens",
      });
    }

    // Convert the amount from string to integer (as chaincode expects integer)
    const amountInt = parseInt(amount, 10);

    if (amountInt <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive integer",
      });
    }

    // Create a new client application instance
    let userClient = new clientApplication();

    // Call the submitTxn method to mint tokens
    const result = await userClient.submitTxn(
      "org2", // Organization
      "mychannel", // Channel name
      "token", // Chaincode name
      "NFTMarketplaceContract", // Contract name
      "invokeTxn", // Transaction type
      "", // Empty string (if not used in your chaincode)
      "Mint", // Function name
      amount// Pass amount as an integer
    );

    // Decode the result
    const decodedResult = new TextDecoder().decode(result);
    console.log("Decoded Result:", decodedResult); 

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Tokens minted successfully!",
      data: { result: decodedResult },
    });
  } catch (error) {
    console.error("Error minting tokens:", error);
    res.status(500).json({
      success: false,
      message: "Error minting tokens",
      data: { error: error.message },
    });
  }
});





module.exports = router;
