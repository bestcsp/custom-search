const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function searchAndSortByPrice() {
    const result = await client.search({
      index: 'products',
      body: {
        query: {
          match_all: {}
        },
        sort: [
          { price: 'desc' }
        ]
      }
    });
    console.log(result.body.hits.hits);
  }
  
  searchAndSortByPrice().catch(console.log);
  