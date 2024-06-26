const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function recreateIndex() {
  const indexName = 'fake-data';

  const { body: exists } = await client.indices.exists({ index: indexName });

  if (exists) {
    await client.indices.delete({ index: indexName });
    console.log(`Index ${indexName} deleted successfully.`);
  }

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
}

recreateIndex().catch(console.log);
