import React, { useState, Suspense, lazy } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Cover, Circular } from "../../../components/ui-components";
import { useGetDataFile } from "../../../components/webservices/dataOfFile";
//import Table from "./table";
//import StepOne from "./StepOne";

const TablePreview = lazy(() => delayForDemo(import("./table")));
const StepOne = lazy(() => delayForDemo(import("./StepOne")));

export default function EvidenceTable({ fileName, filePath, file }) {
  const { fileData, loading, error } = useGetDataFile(fileName);
  const [activeStep, setActiveStep] = React.useState(0);

  const [evidenceOptions, setEvidenceOptions] = useState({
    remove: {},
    selected: {},
  });

  if (loading) {
    return <Circular />;
  }

  if (error) {
    return <>error loading dataFile</>;
  }

  //console.log(evidenceOptions);
  //Select Evidence to be removed

  const steps = [
    {
      label: "Select Evidence",
      description: `Select the evidence to be removed from the first list, the removed evidence will be displayed in the second list.`,
      component: (
        <Suspense fallback={<Circular />}>
          <StepOne
            fileData={fileData}
            evidenceOptions={evidenceOptions}
            setEvidenceOptions={setEvidenceOptions}
          />
        </Suspense>
      ),
    },
    {
      label: "View Table Result",
      description:
        "Table of results with the calculation of the confidence level of each item.",
      component: (
        <Suspense fallback={<Circular />}>
          <TablePreview fileData={fileData} evidenceOptions={evidenceOptions} />
        </Suspense>
      ),
    },
  ];

  const handleFirst = () => {
    setActiveStep(0);
  };

  const handleTable = () => {
    setActiveStep(1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div>
      <Cover>
        <h1>Confidence Level Calculator Tool {fileName}</h1>
      </Cover>
      <Box sx={{ pl: "10%", pr: "10%" }}>
        <p>
          Our tool is designed to remove assigned evidence from objects and
          calculate their confidence level. This empowers users to filter
          records based on their desired evidence, ensuring the quality of the
          data they need.
        </p>
        <Box sx={{ pl: "10%", pr: "10%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {step.label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ mt: "1%" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p>{steps[activeStep].description}</p>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={activeStep === 0 ? handleTable : handleFirst}
              >
                {" "}
                {activeStep === 0
                  ? "Continue to Table Result"
                  : "Return to Select Evidence"}{" "}
              </Button>
            </div>
          </div>

          <div>{steps[activeStep].component}</div>
        </Box>
      </Box>
    </div>
  );
}

function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}
