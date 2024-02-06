import React from 'react'

export default function Map({featureData}) {
  return (
    <div>Map</div>
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