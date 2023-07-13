import DrawingTracesTool from '../../../../components/DrawingTracesTool'

function OperonDtt({id,relatedIds, operon}) {
    const {
        strand,
        regulationPositions
    } = operon
    return ( 
        <div id="dtt_operon">
            <DrawingTracesTool id={id} relatedIds={relatedIds.all} context="operon" strand={strand} leftEndPosition={regulationPositions.leftEndPosition} rightEndPosition={regulationPositions.rightEndPosition} />
        </div>
     );
}

export default OperonDtt;