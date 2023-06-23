import styles from "./DescriptionTable.module.css";

const showSection = (section, title) => {
  if (!section || section.length === 0) {
    return null;
  }
  return (
    <>
      <tr>
        <td className={styles.GeneOntTitles}>{title}</td>
      </tr>
      {section.map((component) => {
        return (
          <tr>
            <td className={styles.name}> {component.name}</td>
          </tr>
        );
      })}
    </>
  );
};

export default function DescriptionTable({ gensorUnit, guInfoDescription }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{guInfoDescription.table.title}</h1>
      <table className={styles.table}>
        <tr>
          <td className={styles.head}>{guInfoDescription.table.head[0]}</td>
        </tr>
        <tr>
          <td className={styles.groups}>{gensorUnit.groups.join(", ")}</td>
        </tr>
        {gensorUnit.geneOntology && (
          <tr>
            <td className={styles.head}>{guInfoDescription.table.head[1]}</td>
          </tr>
        )}
        {showSection(
          gensorUnit.geneOntology?.cellularComponent,
          "Cellular Component:"
        )}
        {showSection(
          gensorUnit.geneOntology?.biologicalProcess,
          "Biological Process:"
        )}
        {showSection(
          gensorUnit.geneOntology?.molecularFunction,
          "Molecular Function:"
        )}
        <br></br>
      </table>
    </div>
  );
}
