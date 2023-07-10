async function run() {
    const { create } = await import('ipfs-http-client');
    const ipfs = await create('/ip4/127.0.0.1/tcp/5001');
    
    // we added three attributes, add as many as you want!
    const metadata = {
        path: '/',
        content: JSON.stringify({
            name: "My First NFT",
            attributes: [
            {
                "trait_type": "Wonkies",
                "value": "4" 
            },
            {
                "trait_type": "botheringSince",
                "value": "1999"
            },
            {
                "trait_type": "MadeIn",
                "value": "Spain"
            }
            ],
            // update the IPFS CID to be your image CID
            image: "https://ipfs.io/ipfs/QmQEdedUHGsAapjnsFq7vkGDLeEswmijqz5tNtwsxjCvxW",
            description: "Welcome to wonkilandia!"
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

    process.exit(0);
}

run();