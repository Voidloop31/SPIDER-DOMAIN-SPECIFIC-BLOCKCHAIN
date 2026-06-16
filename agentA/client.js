require('dotenv').config({ path: 'C:\\Users\\Pratik\\viral-marketing\\.env' });

const viem = require('viem');
const viemAccounts = require('viem/accounts');
const viemChains = require('viem/chains');
const x402 = require('x402-fetch');

async function runCampaign() {

    const myAccount = viemAccounts.privateKeyToAccount(process.env.AGENT_A_PRIVATE_KEY);
    console.log('my wallet address is: ' + myAccount.address);

    const myWallet = viem.createWalletClient({
        account: myAccount,
        chain: viemChains.baseSepolia,
        transport: viem.http('https://sepolia.base.org')
    });

    // wrap fetch so it handles x402 payments
    const payingFetch = x402.wrapFetchWithPayment(fetch, myWallet);

    console.log('getting trending topics from agent b...');
    var topicsRes = await payingFetch('http://localhost:3001/trending-topics');
    var topicsList = await topicsRes.json();
    console.log('got topics: ', topicsList);

    var i = 0;
    while (i < topicsList.length) {

        var currentTopic = topicsList[i];
        console.log('working on topic: ' + currentTopic);

        var tweetRes = await payingFetch('http://localhost:3002/generate-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ keyword: currentTopic })
        });

        var tweetData = await tweetRes.json();
        var myTweet = tweetData.tweet;
        console.log('tweet is ready: ' + myTweet);

        // send to agent d to publish
        var publishRes = await payingFetch('http://localhost:3003/publish-timeline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tweet: myTweet })
        });

        var publishData = await publishRes.json();
        console.log('publish result: ' + publishData.message);

        i++;
    }

    console.log('done! campaign finished successfully');
}

runCampaign();
