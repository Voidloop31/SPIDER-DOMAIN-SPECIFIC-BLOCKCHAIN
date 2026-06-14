require('dotenv').config({ path: 'C:\\Users\\Pratik\\viral-marketing\\.env' });
const { createWalletClient, http } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');
const { baseSepolia } = require('viem/chains');
const { wrapFetchWithPayment } = require('x402-fetch');

async function main() {
    const account = privateKeyToAccount(process.env.AGENT_A_PRIVATE_KEY);
    console.log('Agent A wallet:', account.address);
    console.log('Starting campaign...\n');

    const walletClient = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http('https://sepolia.base.org')
    });

    const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);

    // Step 1: Pay Agent B for trending topics
    console.log('Step 1: Paying Agent B for trending topics...');
    const topicsResponse = await fetchWithPayment('http://localhost:3001/trending-topics');
    const topics = await topicsResponse.json();
    console.log('Topics received:', topics);
    console.log('Paid Agent B $0.002 USDC ✅\n');

    // Step 2: For each keyword, pay Agent C then Agent D
    for (const keyword of topics) {
        console.log(`Processing keyword: ${keyword}`);

        // Pay Agent C to generate tweet
        console.log(`  Paying Agent C to write tweet for ${keyword}...`);
        const tweetResponse = await fetchWithPayment(
            'http://localhost:3002/generate-post',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword })
            }
        );
        const { tweet } = await tweetResponse.json();
        console.log(`  Tweet generated: ${tweet}`);
        console.log(`  Paid Agent C $0.005 USDC ✅`);

        // Pay Agent D to publish tweet
        console.log(`  Paying Agent D to publish tweet...`);
        const publishResponse = await fetchWithPayment(
            'http://localhost:3003/publish-timeline',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tweet })
            }
        );
        const result = await publishResponse.json();
        console.log(`  Published: ${result.message}`);
        console.log(`  Paid Agent D $0.001 USDC ✅\n`);
    }

    console.log('Campaign complete!');
    console.log('Total spent: $0.002 + (3 x $0.005) + (3 x $0.001) = $0.020 USDC');
}

main().catch(console.error);