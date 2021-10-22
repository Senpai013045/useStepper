import { useStepperContext } from './Context';
import * as React from 'react';

interface Props {
  totalNumberOfSteps: number;
  onStepChange?: (step: number) => void;
  onStepsComplete?: () => void;
  onStepsReset?: () => void;
  /**triggers only when handlePrevious is called even when active step is 1 */
  onBack?: () => void;
  /**Components array */
  bodyComponents?: any[];
}

export const useStepper = ({
  totalNumberOfSteps,
  onStepChange,
  onStepsComplete,
  onStepsReset,
  onBack,
  bodyComponents,
}: Props) => {
  const {
    activeStep,
    setActiveStep,
    setTotalSteps,
    totalSteps,
  } = useStepperContext();

  //setTotalSteps to totalNumberOfSteps when component mounts
  React.useEffect(() => {
    //throw error if totalNumberOfSteps is less than 1
    if (totalNumberOfSteps < 1) {
      throw new Error('totalNumberOfSteps must be greater than 0');
    }
    setTotalSteps(totalNumberOfSteps);
  }, [totalNumberOfSteps]);

  React.useEffect(() => {
    //trigger onStepChange when activeStep changes
    onStepChange && onStepChange(activeStep);
  }, [activeStep]);

  const handleNext = () => {
    //if activeStep is less than totalSteps, increment activeStep
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    } else {
      //handle final step
      onStepsComplete && onStepsComplete();
    }
  };

  const handlePrevious = () => {
    //decrement activeStep only if activeStep is greater than 1
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    } else {
      onBack && onBack();
    }
  };

  const navigateStep = (step: number) => {
    //set activeStep to step only if it lies between 1 and totalSteps
    if (step >= 1 && step <= totalSteps) {
      setActiveStep(step);
    }
  };

  const handleReset = () => {
    //set activeStep to 1
    setActiveStep(1);
    //trigger onStepsReset
    onStepsReset && onStepsReset();
  };

  const isFirstStep = activeStep === 1;
  const isLastStep = activeStep === totalSteps;
  const currentStep = activeStep;
  const body = bodyComponents && bodyComponents[currentStep - 1];

  return {
    isFirstStep,
    isLastStep,
    currentStep,
    handleNext,
    handlePrevious,
    navigateStep,
    handleReset,
    body,
  };
};
