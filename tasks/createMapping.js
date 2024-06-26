const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function createIndex() {
  const indexName = 'fake-data'; //index name

  const { body: exists } = await client.indices.exists({ index: indexName });
// to create new mapping, old index need to be deleted
  if (!exists) {
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            title: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword'
                }
              }
            },
            price: { type: 'float' },
            description: { type: 'text' },
            category: { type: 'keyword' },
            image: { type: 'text' },
            rating: {
              properties: {
                rate: { type: 'float' },
                count: { type: 'integer' }
              }
            }
          }
        }
      }
    });
    console.log(`Index ${indexName} created successfully.`);
  } else {
    console.log(`Index ${indexName} already exists.`);
  }
}

createIndex().catch(console.log);
