require('dotenv').config({ path: 'C:\\Users\\Pratik\\viral-marketing\\.env' });

// DEBUG - print what we're reading
console.log('AGENT_B_ADDRESS:', process.env.AGENT_B_ADDRESS);

const express = require('express');
const { paymentMiddleware } = require('x402-express');

const app = express();
app.use(express.json());

app.use(paymentMiddleware(
    process.env.AGENT_B_ADDRESS,
    {
        "/trending-topics": {
            price: "$0.002",
            network: "base-sepolia",
            config: {
                description: "Get trending viral topics"
            }
        }
    }
));

app.get('/trending-topics', (req, res) => {
    res.json(["#Web3", "#AI", "#ZKRollups"]);
});

app.listen(3001, () => {
    console.log('Agent B (Trend Oracle) running on port 3001');
});