//import webService from "./../../../conf/apollo.conf.json";

const urlGraphQL = process.env.REACT_APP_WEB_SERVICE_URL

export const Node = (exampleQuery) => {
  return [
    `
const fetch = require('node-fetch');

async function getData() {
  const data = JSON.stringify(
    {
      query: \`${exampleQuery}\`
        });
    
  const response = await fetch(
    \`${urlGraphQL}\`,
      {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
          'User-Agent': 'Node',
        },
      }
    );
    
  const json = await response.json();
  console.log(JSON.stringify(json, null, 4));
  }
    
    getData();//example
    `,
    "javascript",
  ];
};

export const Python2 = (exampleQuery) => {
  return [
    `
from graphqlclient import GraphQLClient

def main():
    client = GraphQLClient(\`${urlGraphQL}\`)

    result = client.execute('''${exampleQuery}''')

    print(result)

if __name__ == '__main__':
    main()
    `,
    "python",
  ];
};

export const Python3 = (exampleQuery) => {
  return [
    `
import requests
import json

endpoint = f\`${urlGraphQL}\`

query = """${exampleQuery}"""

r = requests.post(endpoint, json={"query": query})
if r.status_code == 200:
    print(json.dumps(r.json(), indent=2))
else:
    raise Exception(f"Query failed to run with a {r.status_code}.")
    `,
    "python",
  ];
};

export const R = (exampleQuery) => {
  return [
    `
library("ghql")
library("jsonlite")

con <- GraphqlClient$new(\`${urlGraphQL}\`)
qry <- Query$new()

qry$query('dc', '${exampleQuery}')

res <- con$exec(qry$queries$dc)
head(jsonlite::fromJSON(res)$data$publications$nodes)
    `,
    "r",
  ];
};

export const Java = (exampleQuery) => {
  return [
    `
import java.io.BufferedReader;
import java.io.Console;
import java.io.IOException;
import java.io.InputStreamReader;
import org.json.*;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.entity.StringEntity;
    
class Main {
    public static void main(String[] args) {
        CloseableHttpClient client = null;
        CloseableHttpResponse response = null;
    
        client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(\`${urlGraphQL}\`);
    
      
        httpPost.addHeader("Content-Type", "application/json");
    
        try {
            JSONObject jsonobj = new JSONObject();
            jsonobj.put("query",
                    "${exampleQuery}");
                        
            StringEntity entity = new StringEntity(jsonobj.toString());
    
            httpPost.setEntity(entity);
            response = client.execute(httpPost);
    
        } catch (JSONException e) {
            // Do something to recover ... or kill the app.
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line;
            StringBuilder builder = new StringBuilder();
            while ((line = reader.readLine()) != null) {
    
                builder.append(line);
    
            }
            System.out.println(builder.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    
    }
}
    `,
    "java",
  ];
};

export const Ruby = (exampleQuery) => {
  return [
    `
require 'net/http'
require 'json'
require 'uri'
    
    
query = """${exampleQuery}"""
    
uri = URI(\`${urlGraphQL}\`)

res = Net::HTTP.start(uri.host, uri.port) do |http|
    req = Net::HTTP::Post.new(uri)
    req['Content-Type'] = 'application/json'
    # The body needs to be a JSON string.
    req.body = JSON[{'query' => query}]
    #puts(req.body)
    http.request(req)
end
puts(res.body)
    `,
    "ruby",
  ];
};

export const Curl = (exampleQuery) => {
  return [
    `
curl \`${urlGraphQL}\` \
-X POST \
-H 'content-type: application/json' \
--data '{
  "query": "${exampleQuery}"
  }'
    `,
    "bash",
  ];
};

export const Wget = (exampleQuery) => {
  return [
    `
    
wget -q --header='Content-type:application/json' 
'${exampleQuery}'  -O -
    `,
    "bash",
  ];
};
