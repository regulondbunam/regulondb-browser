import md2json from "md-2-json";

export const FormatData = (data) => {
  console.log(data);
  if (!data) {
    return {}
  }
  let dataMenu = data.__type.fields;


  let dataWithOutMD = [];

  for (let i = 0; i < dataMenu.length; i++) {
    let descrip = "..."
    if (dataMenu[i].description !== null) {
      descrip = dataMenu[i].description.replace(/#+/g, "#");
    }
    let DataMDtoObj = md2json.parse(descrip);
    dataWithOutMD.push(DataMDtoObj);
  }
  let menuElements = [];

  let contador = 1;
  dataWithOutMD.forEach((e) => {
    if (e.Type) {
      const Type = deleteBreakLines(e.Type.raw);
      let objCategory = {
        id: contador,
        title: Type,
        value: Type,
        sons: [],
      };
      if (!objExists(objCategory, menuElements)) {
        menuElements.push(objCategory);
        contador += 1;
      }
    }

  });
  // Segundo Nivel
  contador = 1;
  dataWithOutMD.forEach((e) => {
    if (e.Type && e.Service) {
      const Type = deleteBreakLines(e.Type.raw);
      const Service = deleteBreakLines(e.Service.raw);
      let objService = {
        id: `${Service}_${contador}`,
        title: Service,
        value: Service,
        sons: [],
      };
      let index = menuElements.findIndex((x) => x.value === Type);

      if (!objExists(objService, menuElements[index].sons)) {
        menuElements[index].sons.push(objService);
        contador += 1;
      }
    }
  });

  // Tercer Nivel
  contador = 1;
  dataWithOutMD.forEach((e) => {
    if (e.Type && e.Service && e.Name) {
      const Type = deleteBreakLines(e.Type.raw);
      const Service = deleteBreakLines(e.Service.raw);
      const Name = deleteBreakLines(e.Name.raw);

      let objName = {
        id: `${Type}_${Service}_${contador}`,
        title: Name,
        value: Name,
      };

      let index = menuElements.findIndex((x) => x.value === Type);
      let index2 = menuElements[index].sons.findIndex((x) => x.value === Service);
      if (!objExists(objName, menuElements[index].sons[index2].sons)) {
        menuElements[index].sons[index2].sons.push(objName);
        contador += 1;
      }
    }
  });

  const ServiceData = { menuElements };
  return ServiceData;
};

export const FormatDataDesc = (data) => {
  let dataMenu = data.__type.fields;

  let dataWithOutMD = [];

  for (let i = 0; i < dataMenu.length; i++) {
    if (dataMenu[i].description !== null) {
      let descrip = dataMenu[i].description.replace(/#+/g, "#");
      let DataMDtoObj = md2json.parse(descrip);
      dataWithOutMD.push(DataMDtoObj);
    }

  }

  let menuData = {};

  dataWithOutMD.forEach((e) => {
    const Type = deleteBreakLines(e.Type.raw);
    const Service = deleteBreakLines(e.Service.raw);
    const Name = deleteBreakLines(e.Name.raw);
    if (!menuData.hasOwnProperty(Type)) {
      menuData[Type] = {};
    }

    if (!menuData[Type].hasOwnProperty([Service])) {
      menuData[Type][Service] = [];
    }

    menuData[Type][Service].push({
      Nombre: Name,
      Descripcion: deleteBreakLines(e.Description.raw),
    });
  });

  return menuData;
};

export const FormatDataTable = (data) => {
  let args = data.__type.fields;

  let ObjArguments = {};
  for (let i = 0; i < args.length; i++) {
    if (!ObjArguments.hasOwnProperty(args[i].name)) {
      ObjArguments[args[i].name] = {};
    }
    for (let j = 0; j < args[i].args.length; j++) {
      if (!ObjArguments[args[i].name].hasOwnProperty(args[i].args[j].name)) {
        ObjArguments[args[i].name][args[i].args[j].name] = [];
      }
      let DataMDtoObj;
      if (args[i].args[j].description !== undefined) {
        let descrip = args[i].args[j].description.replace(/#+/g, "#");
        DataMDtoObj = md2json.parse(descrip);
      }

      if (DataMDtoObj !== undefined) {
        ObjArguments[args[i].name][args[i].args[j].name].push({
          Descripcion: DataMDtoObj["Description"]["raw"],
          ValorPorDefault: args[i].args[j].defaultValue,
          Necesario: DataMDtoObj["Required"]["raw"],
          Tipo:
            args[i].args[j].type.name == null
              ? `[${args[i].args[j].type.ofType.name}]`
              : args[i].args[j].type.name,
        });
      }
    }
  }
  return ObjArguments;
};

export const FormatDataServDesc = (data) => {
  let dataDesc = data.__type.fields;

  let dataWithOutMD = [];

  for (let i = 0; i < dataDesc.length; i++) {
    if (dataDesc[i].description !== null) {
      let descrip = dataDesc[i].description.replace(/#+/g, "#");
      let DataMDtoObj = md2json.parse(descrip);
      dataWithOutMD.push(DataMDtoObj);
    }
  }

  let DescriptionServices = [];

  dataWithOutMD.forEach((e) => {
    const Name = deleteBreakLines(e.Name.raw);

    DescriptionServices.push({
      Nombre: Name,
      Descripcion: deleteBreakLines(e.Description.raw),
      Ejemplo: [
        e.Example === undefined
          ? "Not Example"
          : deleteTemplateLiterals(e.Example["raw"]),
      ],
    });
  });

  return DescriptionServices;
};

function objExists(obj, array) {
  return array.some(function (objData) {
    return objData.title === obj.title;
  });
}

function deleteTemplateLiterals(str) {
  let str2 = str.replace(/```json|```/g, "");
  return str2;
}

function deleteBreakLines(str) {
  let str2 = str.replace(/\n|\r|^\s+/g, "");
  return str2;
}
