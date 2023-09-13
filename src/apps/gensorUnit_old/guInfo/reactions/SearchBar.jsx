import Autocomplete from "@mui/material/Autocomplete";

export default function SearchBar({ elements, map, placeholder }) {
  let data = generateOptions(elements);
  function generateOptions() {
    let options = [];
    elements.forEach((element) => {
      options.push(element.data.id);
    });
    return options;
  }
  //

  let findElement = (inputValue) => {
    let elemento = map.$("#" + inputValue);
    let x = elemento.position("x") + 80;
    let y = elemento.position("y") + 90;
    //map.fit(elemento);

    map.center(elemento);
    elemento.animate({
      position: { x, y },
      duration: 500,
    });
    x -= 80;
    y -= 90;
    elemento.animate({
      position: { x, y },
      duration: 500,
    });
    elemento.select();
  };

  /* const filtraroptions = (value) => {
    let str = new RegExp(value.toLowerCase());
    return data.filter((option) => str.test("/^" + option.toLowerCase() + "/"));
  };*/
  return (
    <div id="autoCompleat">
      <Autocomplete
        sx={{
          display: "inline-block",
          "& input": {
            width: 300,
            height: "28px",
            paddingTop: "5px",
            paddingBottom: "5px",
            paddingLeft: "5px",
            borderRadius: "3px",
            border: "1px solid rgba(153, 153, 153, 0.6)",
            bgcolor: "background.paper",
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        id="custom-input-demo"
        options={data}
        onChange={(e, inputValue) => {
          if (inputValue) findElement(inputValue);
        }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              type="text"
              {...params.inputProps}
              placeholder={placeholder}
            />
          </div>
        )}
      />
    </div>
  );
}
