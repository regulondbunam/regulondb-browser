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
            const objectValue = this.getPropertyValueOfObject(pathObject.trim(), this.json);

            if (objectValue !== undefined) {
                // Reemplazar la invocación por el contenido del fragmento
                const { content } = this.fragments[fragmentName];
                let replacedContent = this.#replaceVariables(content, objectValue);
                modifiedTemplate = modifiedTemplate.replace(fullMatch, replacedContent);
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
            const arrayValue = this.getPropertyValueOfObject(pathArray.trim(), this.json);

            if (Array.isArray(arrayValue)) {
                // Iterar sobre los elementos del arreglo y reemplazar la invocación por cada elemento
                let replacement = '';
                arrayValue.forEach(item => {
                    const { content } = this.fragments[fragmentName];
                    replacement += this.#replaceVariables(content, item).trim() + '\n';
                });
                modifiedTemplate = modifiedTemplate.replace(fullMatch, replacement.trim());
            } else {
                // Manejar el caso donde el arreglo no está definido o no es un arreglo
                console.warn(`Array '${pathArray}' not found in JSON or is not an array.`);
                // Podrías decidir qué hacer en este caso, por ejemplo, dejar la invocación intacta
            }
        }

        this.template = modifiedTemplate; // Actualizar el template original con el modificado
    }

    #replaceVariables(template, json) {
        // Expresión regular para buscar variables en el template
        const variableRegex = /\${([\w.]+)}/g;

        let match;
        let modifiedTemplate = template; // Copia del template original para modificaciones

        // Buscar todas las variables en el template
        while ((match = variableRegex.exec(template)) !== null) {
            const fullMatch = match[0];
            const property = match[1]; // Para ${<propiedad>} y ${<objeto.propiedad>}

            if (property !== undefined) {
                // Reemplazar la variable por el valor correspondiente del objeto JSON
                const value = this.getPropertyValueOfObject(property.trim(), json);
                modifiedTemplate = modifiedTemplate.replace(fullMatch, value !== undefined ? value : '');
            }
        }

        return modifiedTemplate; // Devolver el template modificado
    }

    getPropertyValueOfObject(propertyPath, obj) {
        // Función para obtener el valor de una propiedad en el objeto JSON
        const pathParts = propertyPath.split('.');
        for (const part of pathParts) {
            if (obj[part] !== undefined) {
                obj = obj[part];
            } else {
                // Manejar el caso donde la propiedad no está definida
                console.warn(`Property '${propertyPath}' not found in JSON.`);
                return ''; // O devuelve un valor por defecto según tu lógica
            }
        }
        return obj;
    }

    #removeSingleLineComments() {
        const singleLineCommentRegex = /\$#.*$/gm;
        this.template = this.template.replace(singleLineCommentRegex, '').trim();
    }

    #removeMultiLineComments() {
        const multiLineCommentRegex = /\$#\{[\s\S]*?\}#\$/g;
        this.template = this.template.replace(multiLineCommentRegex, '').trim();
    }

    getCompileText() {
        // 0 -> eliminar comentarios de una sola línea y multilínea
        this.#removeMultiLineComments();
        this.#removeSingleLineComments();
        

        // 1 -> identificar fragmentos y almacenarlos y quitarlos
        this.#fragmentsExtractor();

        // 2 -> reemplazar invocaciones de fragmentos que reciben objetos por su contenido
        this.#replaceObjectFragmentInvocations();

        // 3 -> reemplazar invocaciones de fragmentos que reciben arreglos por su contenido
        this.#replaceArrayFragmentInvocations();

        // 4 -> reemplazar variables en el template por los valores correspondientes del objeto JSON
        this.template = this.#replaceVariables(this.template, this.json);

        // Imprimir el template modificado
        console.log(this.template);
    }
}
