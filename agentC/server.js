require('dotenv').config({ path: 'C:\\Users\\Pratik\\viral-marketing\\.env' });

const express = require('express');
const x402 = require('x402-express');

const app = express();
app.use(express.json());

app.use(x402.paymentMiddleware(
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

app.post('/generate-post', function(req, res) {
    var keyword = req.body.keyword;

    var tweetOptions = {
        "#Web3": "🚀 " + keyword + " is revolutionizing the internet! Decentralization is not the future — it's NOW. Are you building or watching? 💡 #blockchain #crypto #buildinpublic",
        "#AI": "🤖 " + keyword + " is changing EVERYTHING. From code to content, the machines are learning faster than ever. The question is: are YOU keeping up? 🧠⚡ #MachineLearning #tech",
        "#ZKRollups": "🔐 " + keyword + " = the secret weapon of blockchain scaling. Lightning fast. Ultra cheap. Fully secure. The L2 revolution is HERE 🌐💥 #Ethereum #Layer2 #DeFi"
    };

    var myTweet = tweetOptions[keyword];

    if (!myTweet) {
        myTweet = "🌟 " + keyword + " is trending for a reason! The future is being built right now and early adopters always win 🏆 Don't sleep on this! #crypto #Web3 #innovation";
    }

    res.json({ tweet: myTweet });
});

app.listen(3002, function() {
    console.log('agent c is running on port 3002');
});
