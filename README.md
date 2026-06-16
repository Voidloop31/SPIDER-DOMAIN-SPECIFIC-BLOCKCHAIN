# Autonomous Viral Marketing Network via x402

A blockchain-based autonomous agent network where every agent call requires a real USDC payment on Base Sepolia testnet.

## How it works

Agent A is the campaign manager. It pays Agent B to get trending topics, then for each topic it pays Agent C to generate a viral tweet, and then pays Agent D to publish it. Every single call between agents requires a real x402 payment.

## Agents

- **Agent A** - Campaign Manager (client script)
- **Agent B** - Trend Oracle (port 3001) - charges $0.002 USDC
- **Agent C** - Copywriter (port 3002) - charges $0.005 USDC
- **Agent D** - Decentralized Feed (port 3003) - charges $0.001 USDC

## Tech Stack

- Node.js
- Express
- x402-express (payment middleware)
- x402-fetch (automatic payment handling)
- viem (wallet and blockchain interaction)
- Base Sepolia testnet
- USDC stablecoin    

## How to Run

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with your wallet keys:
   AGENT_A_PRIVATE_KEY=0x...

  AGENT_B_PRIVATE_KEY=0x...

  AGENT_C_PRIVATE_KEY=0x...

  AGENT_D_PRIVATE_KEY=0x...

  AGENT_A_ADDRESS=0x...

  AGENT_B_ADDRESS=0x...

  AGENT_C_ADDRESS=0x...

  AGENT_D_ADDRESS=0x...
  
4. Open 3 terminals and run each agent server:
node agentB/server.js

node agentC/server.js

node agentD/server.js

5. Run Agent A in a fourth terminal:
node agentA/client.js
## On-chain Wallet Addresses

- Agent B: 0x385442c0d59167191c32C9c558c1357451b3478F
- Agent C: 0xCEB615528db383dC0Fa2eB473F061daa22b02dbD
- Agent D: 0x37AC7D5403f31514F6eEB471c28241513351d03E

## Payment Flow

Agent A pays $0.002 to Agent B for trending topics.
For each of the 3 keywords, Agent A pays $0.005 to Agent C for a tweet and $0.001 to Agent D to publish it.
Total cost per run: $0.020 USDC

VIDEO LINK: https://drive.google.com/file/d/1Qq1zUAAE9v5OaF8PMx0OacPrTWWuTmuj/view?usp=drive_link
