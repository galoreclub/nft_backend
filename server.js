const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
// Middleware to parse incoming requests
app.use(bodyParser.json());

// Endpoint to receive Shopify webhook notifications
app.post('/shopify-webhook', async (req, res) => {
  try {
    const orderData = req.body;
    console.log('Received order data:', orderData);

    // Process the order data and mint the NFT using the Underdog Protocol SDK

    const options = {
        method: 'POST',
        url: 'https://mainnet.underdogprotocol.com/v2/projects/1/nfts',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer f35e39731fda2c.14dcd112550e4f29a7aec5d746148b39'
        },
        data: {
          attributes: {
            'Serial Number': '123456789',
            'Purchase Date': '31/01/2023',
            'Last Sold Price': '£3500'
          },
          receiver: {address: '8rye9YJCVQth2sVbPUYwjjcWfvmM46gvVMm4TMn9nD6n'},
          name: 'Chanel Diana Bag Single Flap',
          symbol: 'CDB',
          description: 'The Diana bag by Chanel is a highly coveted vintage luxury handbag named after Princess Diana. Produced from 1989-1995, it features Chanel\'s iconic leather, chain strap and hardware. Extremely versatile and timeless, the Diana bag is considered a must-have investment piece for fans of Chanel\'s heritage and classic designs.',
          image: 'https://ibb.co/CwdyyCH',
          externalUrl: 'https://galore-frontend-1ca0fcb7d916.herokuapp.com/digitalpassport/1234'
        }
      };
      
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });

    res.status(200).send('Webhook received successfully');
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Error handling webhook');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

