import React, { useState, Suspense, lazy } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
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
    tfrsEvidence: {
      remove: {},
      selected: {},
    },
    riEvidence: {
      remove: {},
      selected: {},
    },
  });

  if (loading) {
    return <Circular />;
  }

  if (error) {
    return <>error loading dataFile</>;
  }

  //console.log(evidenceOptions);

  const steps = [
    {
      label: "Select Evidences",
      description: `As a first step, uncheck the evidences to be removed from the calculation.`,
      component: (
        <Suspense fallback={<Circular />}>
          <StepOne
            fileData={fileData}
            evidenceOptions={evidenceOptions}
            setEvidenceOptions={setEvidenceOptions}
          />
          ,
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Cover>
        <h1>Evidence {fileName}</h1>
      </Cover>
      <Box sx={{ pl: "10%" }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                {step.component}
                <Box sx={{ mb: 2 }}>
                  <div>
                    {index === 0 && (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continue
                      </Button>
                    )}

                    {index > 0 && (
                      <Button
                       variant="contained"
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
}

function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}
