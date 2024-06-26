
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function searchWithFacets(query = '', page = 1, pageSize = 10) {
    const searchQuery = query ? {
      multi_match: {
        query: query,
        fields: ['title', 'description', 'category']
      }
    } : {
      match_all: {}
    };
  
    const result = await client.search({
      index: 'fake-data',
      body: {
        query: searchQuery,
        aggs: {
          categories: {
            terms: { field: 'category' }
          },
          titles: {
            terms: { field: 'title.keyword' }
          }
        },
        from: (page - 1) * pageSize,
        size: pageSize
      }
    });
  
    console.log('Search results:', result.body.hits.hits);
    console.log('Aggregations:', result.body.aggregations);
  }
  
  // Example usage
  searchWithFacets('', 1, 10).catch(console.log);  // Default search returns all data
//   searchWithFacets('backpack', 1, 10).catch(console.log);  // Search with query
  