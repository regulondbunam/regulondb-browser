import { ApolloSandbox } from '@apollo/sandbox/react';
  
export function EmbeddedSandbox() {
    let url = ""
    const host = window.location.hostname
    if (host==="localhost") {
        url = process.env.REACT_APP_WEB_SERVICE_URL
    }else{
        url=host+"/graphql"
    }

  return (
        <ApolloSandbox
      initialEndpoint={url}
    />
  );
}