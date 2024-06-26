**Elasticsearch** is a distributed, RESTful search and analytics engine designed for fast, scalable, full-text search. It's built on Apache Lucene and is part of the ELK stack (Elasticsearch, Logstash, Kibana).

### Components:
1. **Index**: Collection of documents with similar characteristics.
2. **Document**: Basic unit of information, stored in JSON format.
3. **Shard**: Subdivision of an index, allowing distributed storage and processing.
4. **Replica**: Copy of a shard, ensuring data redundancy and high availability.
5. **Node**: Single instance of Elasticsearch, part of a cluster.
6. **Cluster**: Collection of nodes working together, sharing data and load.

### Why It's Best for Search:
- **Speed**: Optimized for high-speed full-text searches using inverted indices.
- **Scalability**: Easily handles large volumes of data across distributed nodes.
- **Advanced Features**: Supports complex queries, aggregations, and real-time search capabilities.
- **Integration**: Part of the ELK stack, providing a complete solution for data ingestion, search, and visualization.

### Importance:
Elasticsearch is crucial for applications requiring fast, reliable, and scalable search functionality, making it ideal for real-time data analysis, logging, and complex search requirements.


### Create a docker compose file to run elastic search and once elasticsearch start running try these and run kibana also with it.
- kibana.yml -> to run kibana create this file

### run this command on terminal
- xpack.encryptedSavedObjects.encryptionKey: "something_at_least_32_characters"

