import React from 'react'

export default function Map({featureData}) {
    console.log(featureData);
  return (
    <div>
        {Object.keys(featureData.tracks).map((key)=>{
            let track = featureData.tracks[key]
            return(
                <div key={"track_"+key}
                    style={{
                        height: 30,
                        marginBottom: "5px",
                        display: "flex"
                    }}
                >
                    <div key={"track_"+key}
                    style={{
                        width: 100,
                        height: 30,
                        backgroundColor: "#cadce7",
                        padding: "6px"
                    }}
                >
                    <p style={{
                        fontWeight: "bold",
                        textAlign: "center",
                    }} dangerouslySetInnerHTML={{__html:track.label}} />
                </div>
                <div
                style={{
                    width: "100px",
                    height: 30,
                    backgroundColor: "#999999",
                }}
                >

                </div>
                </div>
            )
        })}
    </div>
  )
}

/**
 * Definicion del JSON featureData v0.1
 * 
 * Propiedades
 {
    map: {
        TrackLength: 0,
        name:"",
        distanceTO: [""]
    },
    tracks: [
        {
            regulators: {},
            promoter: "",
            distanceTo:{
                label: value
            }
            sequence: "",
            label: ""
        }
    ]
 }
 */