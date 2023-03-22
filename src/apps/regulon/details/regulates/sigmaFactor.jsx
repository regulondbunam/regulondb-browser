import { Link } from "react-router-dom";

function SigmaFactor({sigmaFactor}) {
    //console.log(sigmaFactor);
    return ( 
        <div>
            <h2>Sigma Factor</h2>
            <p className="p_accent">{`Total of sigma factors ${sigmaFactor.length}`}</p>
            {sigmaFactor.map((sigma)=>{
                return <Link key={sigma._id} to={"/sigmulon/"+sigma._id} ><p>{`(${sigma.function}) ${sigma.name}`}</p></Link>
            })}
        </div>
     );
}

export default SigmaFactor;