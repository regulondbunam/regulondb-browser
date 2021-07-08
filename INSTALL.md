# RegulonDB Browser website



- ## Installation instructions

[to install]

1. Step 1 Descarga el proyecto desde el repositorio, rama "master"
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
Se requiere de la url del servicio web de graphql de RegulonDB

el repositorio del servicio se encuentra en la siguiente liga
https://github.com/regulondbunam/GraphQL-api/tree/Web_Service_Development 

una vez obtenido la url del servicio se puede ejecutar la siguiente instrucción para cambiar la configuración del servicio web d la aplicación(reemplaza [URL] por la url del servicio web)
```shell
printf '{ "graphQlUrl": "[URL]"}' > src/webServices/apollo.conf.json
```

4. Step 4 Install
Ejecuta el siguiente comando para instalar librerías
```shell
npm install
```
5. build aplication
Ejecuta el siguiente comando para compilar la aplicación
```shell
npm run build
```
6.run aplication
Ejecuta el siguiente comando para iniciar la aplicación web
```shell
serve -s build
```

- ### Expected Directory Structure 

[Directory structure after installation. It should be properly organised in sub-directories (for documentation, headers, source, etc.]



- ### Dependencies

[All required or optional dependencies should be listed, including those by third parties (with references to their websites).]


- ### Errors & Tips
[Describe possible errors that can be occur during the installation software and their solution.]

