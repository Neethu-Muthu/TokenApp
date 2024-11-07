// src/components/VoterRegistrationAuthorityPage.jsx
import React, { useState } from "react";
import { FaUserPlus, FaCheck, FaListAlt, FaInfoCircle } from "react-icons/fa";

const VoterRegistrationAuthorityPage = () => {
  const [activeTab, setActiveTab] = useState("registerVoter");

  // State for registering a voter
  const [voterData, setVoterData] = useState({
    electionId: "",
    voterId: "",
    voterName: "",
  });

  // State for verifying and publishing
  const [voterId, setVoterId] = useState("");
  const [electionId, setElectionId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("Verified");

  // Action handlers (replace these with actual API calls)
  const handleRegisterVoter = (e) => {
    e.preventDefault();
    alert(`Voter "${voterData.voterName}" registered successfully!`);
  };

  const handleVerifyVoter = () => {
    alert(`Voter "${voterId}" has been ${verificationStatus}.`);
  };

  const handlePublishVoterList = () => {
    alert("Voter list has been published for the election.");
  };

  const handleGetVoterStatus = () => {
    alert(`Displaying status for voter "${voterId}".`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 flex flex-col items-center py-10 px-4 text-white">
      <h2 className="text-4xl font-bold mb-8">
        Voter Registration Authority Dashboard
      </h2>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-10">
        {[
          "registerVoter",
          "verifyVoter",
          "publishVoterList",
          "getVoterStatus",
        ].map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              activeTab === tab
                ? "bg-white text-blue-600 shadow-md transform scale-105"
                : "bg-blue-500 bg-opacity-60 hover:bg-opacity-80"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "registerVoter" && "Register Voter"}
            {tab === "verifyVoter" && "Verify Voter"}
            {tab === "publishVoterList" && "Publish Voter List"}
            {tab === "getVoterStatus" && "Get Voter Status"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        {activeTab === "registerVoter" && (
          <form onSubmit={handleRegisterVoter} className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaUserPlus className="text-green-500 mr-2" /> Register New Voter
            </h3>
            <input
              type="text"
              name="electionId"
              placeholder="Election ID"
              value={voterData.electionId}
              onChange={(e) =>
                setVoterData({ ...voterData, electionId: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
            <input
              type="text"
              name="voterId"
              placeholder="Voter ID"
              value={voterData.voterId}
              onChange={(e) =>
                setVoterData({ ...voterData, voterId: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
            <input
              type="text"
              name="voterName"
              placeholder="Voter Name"
              value={voterData.voterName}
              onChange={(e) =>
                setVoterData({ ...voterData, voterName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Register Voter
            </button>
          </form>
        )}

        {activeTab === "verifyVoter" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaCheck className="text-blue-500 mr-2" /> Verify Voter
            </h3>
            <input
              type="text"
              name="voterId"
              placeholder="Voter ID"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
            <select
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            >
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button
              onClick={handleVerifyVoter}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Verify Voter
            </button>
          </div>
        )}

        {activeTab === "publishVoterList" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaListAlt className="text-indigo-500 mr-2" /> Publish Voter List
            </h3>
            <input
              type="text"
              name="electionId"
              placeholder="Election ID"
              value={electionId}
              onChange={(e) => setElectionId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              required
            />
            <button
              onClick={handlePublishVoterList}
              className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
            >
              Publish Voter List
            </button>
          </div>
        )}

        {activeTab === "getVoterStatus" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaInfoCircle className="text-purple-500 mr-2" /> Get Voter Status
            </h3>
            <input
              type="text"
              name="voterId"
              placeholder="Voter ID"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300"
              required
            />
            <button
              onClick={handleGetVoterStatus}
              className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition"
            >
              Get Voter Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterRegistrationAuthorityPage;
