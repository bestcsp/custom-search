const { Client } = require('@elastic/elasticsearch');
const axios = require('axios');

// Set Content-Type globally for Axios
axios.defaults.headers.post['Content-Type'] = 'application/json';

const client = new Client({
  node: 'http://localhost:9200',
//   headers: {
//     'Content-Type': 'application/json'
//   }
headers: {
    'Content-Type': 'application/json' // This line ensures the Content-Type is correctly set
  },
  ssl: {
    rejectUnauthorized: false
  },
  // Disable product check to allow OpenSearch or non-standard Elasticsearch distributions
  disablePrototypePoisoningProtection: true, // Disable additional checks
  productCheck: false, // Disable the product check
});

async function run() {
  try {
    // Fetch product data from the fake store API
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    console.log(`Number of products fetched: ${products.length}`);

    for (const product of products) {
      await client.index({
        index: 'fake-data',
        type: '_doc', // Specify the type
        id: product.id,
        body: product,
        
      });
    }

    // Refresh the index to make the documents available for search
    await client.indices.refresh({ index: 'fake-data' });
    console.log('Products indexed successfully');
  } catch (error) {
    console.error('Error indexing products:', error);
  }
}

run();
