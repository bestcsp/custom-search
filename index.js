const express = require('express');
const cors = require('cors')
const { Client } = require('@elastic/elasticsearch');
const app = express();
const port = 3000;

const client = new Client({ node: 'http://localhost:9200' });

// CORS options to allow requests from frontend running on port 5500
const corsOptions = {
    origin: '*', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};
app.use(express.json());
app.use(cors(corsOptions))

app.post('/search', async (req, res) => {
  const { query, page, pageSize, filters } = req.body;
  const alterField=(field)=>{
    if(field=='titles')field="title.keyword"
    return field
  }
  const searchEnabledFields=['title', 'description', 'category']//we can fetch db data and cache it on every index
  const facetEnabledFields=[{fieldName:"category"},{fieldName:"title"}]//we can use DB call and cacheToHandleIt and //, keyword is being used for tokenized data and 
  const boolQuery = {
    bool: {
      must: query ? [{
        multi_match: {
          query: query,
          fields: searchEnabledFields
        }
      }] : [{
        match_all: {}
      }],
      filter: filters ? filters.map(filter => ({
        term: { [alterField(filter.field)]: filter.value }
      })) : []
    }
  };
  const AggregationQuery=facetEnabledFields.reduce(aggObj,data=>{
    return {
      [data.fieldName]:{terms:{field:alterField(data.fieldName)}}
    }
  },{})
  console.log("-->",JSON.stringify({
    query: boolQuery,
    aggs: AggregationQuery
    ,
    from: (page - 1) * pageSize,
    size: pageSize
  }),)
  const result = await client.search({
    index: 'fake-data',
    body: {
      query: boolQuery,
      aggs: {
        ...AggregationQuery
      },
      from: (page - 1) * pageSize,
      size: pageSize
    }
  });

  res.send({
    hits: result.body.hits.hits,
    aggregations: result.body.aggregations,
    total: result.body.hits.total.value
  });
});
// app.get('/reindex/:indexName',reindex)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
