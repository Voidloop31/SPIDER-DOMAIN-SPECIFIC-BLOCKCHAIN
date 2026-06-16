require('dotenv').config({ path: 'C:\\Users\\Pratik\\viral-marketing\\.env' });

const express = require('express');
const x402 = require('x402-express');

const app = express();
app.use(express.json());

// protect this route with x402 payment
app.use(x402.paymentMiddleware(
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
    var topics = ["#Web3", "#AI", "#ZKRollups"];
    res.json(topics);
});

app.listen(3001, function() {
    console.log('agent b is running on port 3001');
});
