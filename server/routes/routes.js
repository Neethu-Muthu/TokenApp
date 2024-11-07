const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");

router.post("/readelection", async (req, res) => {
  try {
    const { electionId } = req.body;
    if (!electionId) {
      return res.status(400).json({
        success: false,
        message: "Election ID is required",
      });
    }

    let userClient = new clientApplication();
    let election = await userClient.submitTxn(
      "commissioner",
      "votingchannel",
      "vote-contract",
      "VotingContract",
      "queryTxn",
      "",
      "getElectionData",
      electionId
    );

    const data = new TextDecoder().decode(election);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "Election data read successfully!",
      data: { value },
    });
  } catch (error) {
    console.error("Error reading election:", error);
    res.status(500).json({
      success: false,
      message: "Please check the Election ID!",
      data: { error: error.message },
    });
  }
});

router.post("/declareelection", async (req, res) => {
  try {
    const { electionId, commissionerName, electionName, startDate, endDate, description } =
      req.body;

    if (
      !electionId ||
      !commissionerName ||
      !electionName ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let userClient = new clientApplication();

    const result = await userClient.submitTxn(
      "commissioner",
      "votingchannel",
      "vote-contract",
      "VotingContract",
      "invokeTxn",
      "",
      "declareElection",
      electionId,
      commissionerName,
      electionName,
      startDate, 
      endDate,
      description
    );

    res.status(201).json({
      success: true,
      message: "Election declared successfully!",
      data: { result },
    });
  } catch (error) {
    console.error("Error declaring  election:", error);
    res.status(500).json({
      success: false,
      message: "Please check the Election ID!",
      data: { error: error.message },
    });
  }
});

module.exports = router;
