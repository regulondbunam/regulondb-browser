import Paragraph from "../../Paragraph";
import Table from "./DescriptionTable";
export default function Description({ gensorUnit, guInfoDescription }) {
  //gensorUnit.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere dolor magna, id scelerisque sapien scelerisque in. Phasellus enim felis, eleifend sit amet auctor a, dictum sit amet est. Cras posuere quam mauris, eget luctus nisl tincidunt a. Integer auctor odio ex, eu vestibulum tortor bibendum sit amet.";
  return (
    <article>
      {gensorUnit.description && (
        <Paragraph description={gensorUnit.description} />
      )}

      <Table gensorUnit={gensorUnit} guInfoDescription={guInfoDescription} />
    </article>
  );
}
