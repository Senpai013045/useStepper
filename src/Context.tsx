import * as React from 'react';

interface IContext {
  totalSteps: number;
  setTotalSteps: (steps: number) => void;
  activeStep: number;
  setActiveStep: (activeStep: number) => void;
}

const StepContext = React.createContext<IContext>({
  totalSteps: 3,
  setTotalSteps: (_n: number) => {},
  activeStep: 1,
  setActiveStep: (_n: number) => {},
});

const ContextProvider: React.FC = ({ children }) => {
  const [totalSteps, setTotalSteps] = React.useState(3);
  const [activeStep, setActiveStep] = React.useState(1);

  return (
    <StepContext.Provider
      value={{
        totalSteps,
        setTotalSteps,
        activeStep,
        setActiveStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

//withStepper is a High Order Function that takes in any component and return a component wrapped with ContextProvider
export const withStepper = (Component: React.FC) => (props: any) => (
  <ContextProvider>
    <Component {...props} />
  </ContextProvider>
);

export const useStepperContext = () => {
  //check if the context is available
  const context = React.useContext(StepContext);
  if (!context) {
    throw new Error(
      'useStepper must be used within a StepperProvider. Please wrap your component with `withStepper`'
    );
  }
  return context;
};
