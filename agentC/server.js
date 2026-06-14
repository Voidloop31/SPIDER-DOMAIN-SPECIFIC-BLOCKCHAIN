require('dotenv').config({ path: 'C:\\Users\\Pratik\\viral-marketing\\.env' });
const express = require('express');
const { paymentMiddleware } = require('x402-express');

const app = express();
app.use(express.json());

app.use(paymentMiddleware(
    process.env.AGENT_C_ADDRESS,
    {
        "/generate-post": {
            price: "$0.005",
            network: "base-sepolia",
            config: {
                description: "Generate a viral tweet"
            }
        }
    }
));

app.post('/generate-post', (req, res) => {
    const { keyword } = req.body;
    
    const tweets = {
        "#Web3": `🚀 ${keyword} is revolutionizing the internet! Decentralization is not the future — it's NOW. Are you building or watching? 💡 #blockchain #crypto #buildinpublic`,
        "#AI": `🤖 ${keyword} is changing EVERYTHING. From code to content, the machines are learning faster than ever. The question is: are YOU keeping up? 🧠⚡ #MachineLearning #tech`,
        "#ZKRollups": `🔐 ${keyword} = the secret weapon of blockchain scaling. Lightning fast. Ultra cheap. Fully secure. The L2 revolution is HERE 🌐💥 #Ethereum #Layer2 #DeFi`
    };

    const tweet = tweets[keyword] || 
        `🌟 ${keyword} is trending for a reason! The future is being built right now and early adopters always win 🏆 Don't sleep on this! #crypto #Web3 #innovation`;

    res.json({ tweet });
});

app.listen(3002, () => {
    console.log('Agent C (Copywriter) running on port 3002');
});