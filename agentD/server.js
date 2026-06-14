require('dotenv').config({ path: 'C:\\Users\\Pratik\\viral-marketing\\.env' });
const express = require('express');
const { paymentMiddleware } = require('x402-express');

const app = express();
app.use(express.json());

// Mock database - stores published tweets
const timeline = [];

app.use(paymentMiddleware(
    process.env.AGENT_D_ADDRESS,
    {
        "/publish-timeline": {
            price: "$0.001",
            network: "base-sepolia",
            config: {
                description: "Publish tweet to timeline"
            }
        }
    }
));

app.post('/publish-timeline', (req, res) => {
    const { tweet } = req.body;
    
    const post = {
        id: timeline.length + 1,
        tweet,
        publishedAt: new Date().toISOString()
    };
    
    timeline.push(post);
    
    console.log(`Published tweet #${post.id}:`, tweet);
    
    res.json({ 
        success: true, 
        message: "Tweet published!",
        post 
    });
});

// View timeline (free endpoint)
app.get('/timeline', (req, res) => {
    res.json(timeline);
});

app.listen(3003, () => {
    console.log('Agent D (Decentralized Feed) running on port 3003');
});