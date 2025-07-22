# צור את האינדקס orders ב-Elasticsearch עם mapping מתאים
PUT /orders
{
  "mappings": {
    "properties": {
      "fullName": { "type": "text" },
      "address": { "type": "text" },
      "email": { "type": "keyword" },
      "products": {
        "type": "nested",
        "properties": {
          "productId": { "type": "keyword" },
          "name": { "type": "text" },
          "quantity": { "type": "integer" }
        }
      }
    }
  }
}

# דוגמת curl ליצירת האינדקס:
curl -X PUT "localhost:9200/orders" -H "Content-Type: application/json" -d @orders-mapping.json
