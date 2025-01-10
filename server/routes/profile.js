let profile = {
  org1: {
    cryptoPath:
      "/home/neethu/CHF/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com",
    keyDirectoryPath:
      "/home/neethu/CHF/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore",
    certPath:
      "/home/neethu/CHF/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/cert.pem",
    tlsCertPath:
      "/home/neethu/CHF/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt",
    peerEndpoint: "localhost:7051",
    peerHostAlias: "peer0.org1.example.com",
    mspId: "Org1MSP",
  },
  org2: {
    cryptoPath:
      "/home/neethu/CHF/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com",
    keyDirectoryPath:
      "/home/neethu/CHF/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/keystore",
    certPath:
      "/home/neethu/CHF/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/signcerts/cert.pem",
    tlsCertPath:
      "/home/neethu/CHF/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt",
    peerEndpoint: "localhost:9051",
    peerHostAlias: "peer0.org2.example.com",
    mspId: "Org2MSP",
  },
};
module.exports = { profile };
