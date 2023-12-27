const request = require('request');
const randomUseragent = require('random-useragent');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateRandomHeaders() {
  const headers = {
    authority: 'api.discord.gx.games',
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    origin: 'https://www.opera.com',
    referer: 'https://www.opera.com/',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site'
  };

  headers['sec-ch-ua'] = `"${randomUseragent.getRandom()}";v="${Math.floor(Math.random() * 200) + 100}"`;
  headers['sec-ch-ua-platform'] = `"${['Windows', 'Macintosh', 'Linux', 'iPhone', 'iPad'][Math.floor(Math.random() * 5)]}"`;

  return headers;
}

async function makeRequests(numThreads) {
  for (let i = 0; i < numThreads; i++) {
    const options = {
      method: 'POST',
      url: 'https://api.discord.gx.games/v1/direct-fulfillment',
      headers: generateRandomHeaders(),
      body: { partnerUserId: '7f3a89c0-6fa0-4036-b7c0-6907738cf1ca' },
      json: true
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error('Request error:', error);
      } else {
        console.log('Thread', i + 1, 'completed');
        console.log('https://discord.com/billing/partner-promotions/1180231712274387115/' + body.token);
      }
    });
  }
}

rl.question('Enter the number of threads: ', (numThreads) => {
  numThreads = parseInt(numThreads);
  if (isNaN(numThreads) || numThreads <= 0) {
    console.error('Please enter a valid number of threads.');
    rl.close();
  } else {
    makeRequests(numThreads);
    rl.close();
  }
});
