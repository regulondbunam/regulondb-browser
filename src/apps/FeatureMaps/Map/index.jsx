import React, { useId, useState } from "react";
import "./style.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";

const colorFunction = {
  activator: "green",
  repressor: "red",
};

export default function Map({ featureData }) {
  console.log(featureData);
  const { map, tracks } = featureData;
  const id = useId();
  const width = Math.abs(map.trackLeft - map.trackRight);
  const bpWidth = 8;
  const [viewType, setViewType] = useState(map.viewType[0])
  //const [isMeasure, setIsMeasure] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1);


  const handleZoomIn = () => {
    if (zoomLevel - 0.25 > 0) {
      setZoomLevel((z) => z - 0.25);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel - 0.25 < 2) {
      setZoomLevel((z) => z + 0.25);
    }
  };

  const handleChangeViewType = (event)=>{
    setViewType(event.target.value)
  }

  return (
    <div>
      <div className="FM_headerMap">
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Distance To:
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={viewType}
              onChange={handleChangeViewType}
              label="Distance To"
            >
              {map.distanceTo.map((element) => {
                return <MenuItem value={element}>{element}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <ButtonGroup variant="contained" size="small">
            <Button onClick={handleZoomIn}>Zoom In</Button>
            <Button onClick={handleZoomOut}>Zoom Out</Button>
          </ButtonGroup>
        </div>
      </div>
      <div style={{ overflow: "auto" }}>
        <table className="FM_tableMap">
          <thead>
            <tr>
              <th style={{ width: "120px" }}>Regulated Entity</th>
              <th style={{ width: "50px" }}>Type</th>
              {positions.map((position, index) => {
                return (
                  <th
                    key={"position_map_" + position.label + "_" + index}
                    style={{
                      minWidth: position.width + "px",
                      maxWidth: position.width + "px",
                    }}
                  >
                    {position.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {Object.keys(featureData.tracks).map((key) => {
              let track = featureData.tracks[key];
              let features = { ...track.features };
              return (
                <tr key={"track_" + key}>
                  <td>
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      dangerouslySetInnerHTML={{ __html: track.label }}
                    />
                  </td>
                  <td>
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      dangerouslySetInnerHTML={{ __html: track.type }}
                    />
                  </td>
                  {positions.map((position, index) => {
                    let _features = {};
                    Object.keys(features).forEach((key) => {
                      const feature = features[key];

                      if (feature) {
                        if (
                          feature.distanceTo[distanceTo] >= position.posL &&
                          feature.distanceTo[distanceTo] <= position.posR
                        ) {
                          const rbs = feature.rbs;
                          const left =
                            Math.abs(position.value) -
                            Math.abs(feature.distanceTo[distanceTo]) +
                            position.width / 2 +
                            "px";
                          console.log(
                            key,
                            position.width,
                            position.value,
                            feature.distanceTo[distanceTo],
                            left
                          );
                          const size =
                            rbs.rightEndPosition - rbs.leftEndPosition;
                          _features[key] = {
                            position: "relative",
                            left: left,
                            width: size + "px",
                            height: "15px",
                            backgroundColor: colorFunction[rbs.function],
                          };
                          features[key] = undefined;
                        }
                      }
                    });
                    //distanceTo
                    return (
                      <td
                        key={"position_track_" + position.label + "_" + index}
                        style={{ textAlign: "center" }}
                      >
                        <div className="FM_mapCell">
                          <div className="FM_mapLine" />
                          {Object.keys(_features).map((key) => {
                            return (
                              <div
                                key={"feature_" + key}
                                style={_features[key]}
                                className="FM_mapFeature"
                              ></div>
                            );
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
