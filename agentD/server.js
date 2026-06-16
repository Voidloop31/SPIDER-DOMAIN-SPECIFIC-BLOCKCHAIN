require('dotenv').config({ path: 'C:\\Users\\Pratik\\viral-marketing\\.env' });

const express = require('express');
const x402 = require('x402-express');

const app = express();
app.use(express.json());

var timeline = [];

app.use(x402.paymentMiddleware(
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

app.post('/publish-timeline', function(req, res) {
    var tweet = req.body.tweet;

    var post = {
        id: timeline.length + 1,
        tweet: tweet,
        publishedAt: new Date().toISOString()
    };

    timeline.push(post);

    console.log('published tweet number ' + post.id + ': ' + tweet);

    res.json({
        success: true,
        message: "Tweet published!",
        post: post
    });
});

app.get('/timeline', function(req, res) {
    res.json(timeline);
});

app.listen(3003, function() {
    console.log('agent d is running on port 3003');
});
