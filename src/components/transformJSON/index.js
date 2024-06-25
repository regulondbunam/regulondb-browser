export default class ParseJSONtoTemplate {
    fragments = {}

    constructor(json, template) {
        this.json = json;
        this.template = template;
    }

    #fragmentsExtractor() {
        const fragmentRegex = /\$define\s+(\w+)\(([^)]*)\)\s*\{/g;

        let match;
        let modifiedTemplate = this.template; // Copia del template original para modificaciones

        // Buscar todas las coincidencias de fragmentos en el template
        while ((match = fragmentRegex.exec(this.template)) !== null) {
            const fragmentName = match[1];
            const parameters = match[2];
            const startIndex = match.index + match[0].length;

            let braceCount = 1;
            let endIndex = startIndex;

            while (braceCount > 0 && endIndex < this.template.length) {
                if (this.template[endIndex] === '{') {
                    braceCount++;
                } else if (this.template[endIndex] === '}') {
                    braceCount--;
                }
                endIndex++;
            }

            const content = this.template.slice(startIndex, endIndex - 1).trim();
            this.fragments[fragmentName] = { parameters, content };

            // Eliminar la definición del fragmento del template modificado
            const fragmentDefinition = this.template.slice(match.index, endIndex);
            modifiedTemplate = modifiedTemplate.replace(fragmentDefinition, '').trim();
        }

        this.template = modifiedTemplate; // Actualizar el template original con el modificado
    }

    #replaceObjectFragmentInvocations() {
        // Expresión regular para buscar invocaciones de fragmentos que reciben objetos
        const objectInvocationRegex = /\${(\w+)\(([^)]*)\)}/g;

        let match;
        let modifiedTemplate = this.template; // Copia del template original para modificaciones

        // Buscar todas las invocaciones de fragmentos que reciben objetos en el template
        while ((match = objectInvocationRegex.exec(this.template)) !== null) {
            const fullMatch = match[0];
            const fragmentName = match[1];
            const pathObject = match[2];

            // Obtener el objeto del JSON
            const objectValue = this.getPropertyValue(pathObject.trim());

            if (objectValue !== undefined) {
                // Reemplazar la invocación por el contenido del fragmento
                const { content } = this.fragments[fragmentName];
                modifiedTemplate = modifiedTemplate.replace(fullMatch, content);
            } else {
                // Manejar el caso donde el objeto no está definido
                console.warn(`Object '${pathObject}' not found in JSON.`);
                // Podrías decidir qué hacer en este caso, por ejemplo, dejar la invocación intacta
            }
        }

        this.template = modifiedTemplate; // Actualizar el template original con el modificado
    }

    #replaceArrayFragmentInvocations() {
        // Expresión regular para buscar invocaciones de fragmentos que reciben arreglos
        const arrayInvocationRegex = /\$\[(\w+)\(([^)]*)\)]/g;

        let match;
        let modifiedTemplate = this.template; // Copia del template original para modificaciones

        // Buscar todas las invocaciones de fragmentos que reciben arreglos en el template
        while ((match = arrayInvocationRegex.exec(this.template)) !== null) {
            const fullMatch = match[0];
            const fragmentName = match[1];
            const pathArray = match[2];

            // Obtener el arreglo del JSON
            const arrayValue = this.getPropertyValue(pathArray.trim());

            if (Array.isArray(arrayValue)) {
                // Iterar sobre los elementos del arreglo y reemplazar la invocación por cada elemento
                let replacement = '';
                arrayValue.forEach(item => {
                    const { content } = this.fragments[fragmentName];
                    replacement += content.replace(/\$[^\]]*]/g, item);
                });
                modifiedTemplate = modifiedTemplate.replace(fullMatch, replacement);
            } else {
                // Manejar el caso donde el arreglo no está definido o no es un arreglo
                console.warn(`Array '${pathArray}' not found in JSON or is not an array.`);
                // Podrías decidir qué hacer en este caso, por ejemplo, dejar la invocación intacta
            }
        }

        this.template = modifiedTemplate; // Actualizar el template original con el modificado
    }

    #replaceVariables() {
        // Expresión regular para buscar variables en el template
        const variableRegex = /\${([^}]*)}|\$\[([^\]]*)\]\.join\(\)/g;

        let match;
        let modifiedTemplate = this.template; // Copia del template original para modificaciones

        // Buscar todas las variables en el template
        while ((match = variableRegex.exec(this.template)) !== null) {
            const fullMatch = match[0];
            const property = match[1]; // Para ${<propiedad>}
            const arrayJoin = match[2]; // Para $[array].join()

            if (property !== undefined) {
                // Reemplazar la variable por el valor correspondiente del objeto JSON
                const value = this.getPropertyValue(property.trim());
                modifiedTemplate = modifiedTemplate.replace(fullMatch, value);
            } else if (arrayJoin !== undefined) {
                // Reemplazar el array por su representación unida
                const arrayValue = this.getPropertyValue(arrayJoin.trim());
                if (Array.isArray(arrayValue)) {
                    modifiedTemplate = modifiedTemplate.replace(fullMatch, arrayValue.join());
                }
            }
        }

        this.template = modifiedTemplate; // Actualizar el template original con el modificado
    }

    getPropertyValue(propertyPath) {
        // Función para obtener el valor de una propiedad en el objeto JSON
        const pathParts = propertyPath.split('.');
        let value = this.json;

        for (const part of pathParts) {
            if (value[part] !== undefined) {
                value = value[part];
            } else {
                // Manejar el caso donde la propiedad no está definida
                console.warn(`Property '${propertyPath}' not found in JSON.`);
                return ''; // O devuelve un valor por defecto según tu lógica
            }
        }

        return value;
    }

    getCompileText() {
        // 1 -> identificar fragmentos y almacenarlos y quitarlos
        this.#fragmentsExtractor();

        // 2 -> reemplazar invocaciones de fragmentos que reciben objetos por su contenido
        this.#replaceObjectFragmentInvocations();

        // 3 -> reemplazar invocaciones de fragmentos que reciben arreglos por su contenido
        this.#replaceArrayFragmentInvocations();

        // 4 -> reemplazar variables en el template por los valores correspondientes del objeto JSON
        this.#replaceVariables();

        // Imprimir el template modificado
        console.log('Modified Template:', this.template);
    }
}
