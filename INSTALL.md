# RegulonDB Browser website



- ## Installation instructions

[to install]

1. Step 1 download repository
Execute:

```shell
git clone https://github.com/regulondbunam/RegulonDB-Browser.git
```
2. 
Entra al directorio del proyecto

```shell
cd Regulon-Browser
```

3. Step 3 URL Web Services
You need the url of RegulonDB's grapQL service, you can find more information at 
https://github.com/regulondbunam/GraphQL-api/tree/Web_Service_Development 

once you have the url of the web service run the following configuration command, to run it you must be positioned in the root of the project

```shell
printf '{ "graphQlUrl": "https://regulonws-api.herokuapp.com/graphql"}' > src/webServices/apollo.conf.json
```

4. Step 4 Install

```shell
npm install
```

5. Run Aplication

```shell
npm run build
```

```shell
serve -s build
```

- ### Expected Directory Structure 

[Directory structure after installation. It should be properly organised in sub-directories (for documentation, headers, source, etc.]



- ### Dependencies

[All required or optional dependencies should be listed, including those by third parties (with references to their websites).]


- ### Errors & Tips
[Describe possible errors that can be occur during the installation software and their solution.]
