import Select from "react-select";

function cambiarLayout(layoutName, cy) {
  cy.layout({
    name: layoutName,
    // Otras opciones de configuración del layout
  }).run();
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "unset", // Anula la altura mínima
    height: "33px", // Ajusta la altura deseada aquí
  }),
};

export default function ComboBox({ options, cy ,placeholder}) {
  return (
    <Select
      options={options}
      onChange={(e) => {
        cambiarLayout(e.value, cy);
      }}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
}
