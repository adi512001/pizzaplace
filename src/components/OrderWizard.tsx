import React, { useEffect, useState } from "react";
import { OrderType } from "../slices/ordersSlice";
import { Box, capitalize } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderModal.scss";

const steps = ["View order details", "Make the order", "Finish order"];

interface OrderWizardProps {
  order: OrderType | null;
  handleClose: () => void;
}

const OrderWizard: React.FC<OrderWizardProps> = ({ order, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (activeStep === steps.length) {
      handleClose();
    }
  }, [activeStep]);

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Typography gutterBottom>{`Size: ${capitalize(
              order?.size || ""
            )}`}</Typography>
            <Typography>Toppings:</Typography>
            <ul>
              {order?.toppings.map((topping, index) => (
                <li key={topping + index}>
                  <Typography>{capitalize(topping)}</Typography>
                </li>
              ))}
            </ul>
            <Typography
              gutterBottom
            >{`Order Total: ${order?.price}$`}</Typography>
            <Typography gutterBottom>Client Details:</Typography>
            <Typography>{`- Name: ${order?.client?.name}`}</Typography>
            <Typography>{`- Phone: ${order?.client?.phone}`}</Typography>
            <Typography>{`- Email: ${order?.client?.email}`}</Typography>
            <Typography>{`- Address: ${order?.client?.address}`}</Typography>
          </>
        );
      case 1:
        return <Typography>Making of order...</Typography>;
      case 2:
        return (
          <Box className="modal-wizard-success">
            <Typography>Order finished!</Typography>
            <CheckCircleIcon className="modal-wizard-success-icon" />
          </Box>
        );

      default:
        break;
    }
  };

  return (
    <Box className="modal-wizard">
      <Stepper activeStep={activeStep} className="modal-wizard-steps">
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Box className="modal-wizard-step">{renderStep()}</Box>
        <Box className="modal-wizard-buttons">
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};
export default OrderWizard;
