import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { WizardContext, WizardProps } from './types';
import { getValidChildren, usePrevious } from './utils';

const Wizard = createContext<WizardContext | null>(null);
Wizard.displayName = 'WizardProvider';

/**
 *
 * Wizard provider. Pass your steps components as children.
 * @param header Optionnal custom header component.
 * @param footer Optionnal custom footer component.
 * @param initialIndex Optionnal initial index to start the wizard at a specific step.
 */
export const WizardProvider = ({
  children,
  header,
  footer,
  initialIndex = 1,
  onStartReached,
  onEndReached,
}: PropsWithChildren<WizardProps>) => {
  /**
   *
   * Return the wizard custom state and setState.
   */
  const [state, setState] = useState<unknown>();

  /**
   *
   * Return the current step index.
   */
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  /**
   *
   * Return the previous step index.
   */
  const previousIndex = usePrevious(activeIndex);

  /**
   *
   * Return the maximum amount of steps based on the number of children passed in the provider.
   */
  const maxAmountOfSteps = useMemo(
    () => getValidChildren(children).length,
    [children]
  );

  /**
   *
   * Go to a specific step.
   */
  const goToStep = useCallback(
    (step: number) => {
      if (step <= 0 || step > maxAmountOfSteps) {
        throw new Error('Invalid step.');
      }
      setActiveIndex(step);
    },
    [maxAmountOfSteps]
  );

  /**
   *
   * Go to the first step.
   */
  const goToFirstStep = useCallback(() => {
    setActiveIndex(1);
  }, []);

  /**
   *
   * Go to the last step.
   */
  const goToLastStep = useCallback(() => {
    setActiveIndex(maxAmountOfSteps);
  }, [maxAmountOfSteps]);

  /**
   *
   * Go to the previous step. If it's already the first step, invoke `onStartReached` callback if provided.
   */
  const goToPreviousStep = useCallback(() => {
    if (activeIndex === 1) {
      if (onStartReached) {
        return onStartReached();
      } else {
        return;
      }
    }
    setActiveIndex((prev) => prev - 1);
  }, [activeIndex, onStartReached]);

  /**
   *
   * Go to the next step. If it's already the last stpe, invoke `onEndReached` callback if provided.
   */
  const goToNextStep = useCallback(() => {
    if (activeIndex >= maxAmountOfSteps) {
      if (onEndReached) {
        return onEndReached();
      } else {
        return;
      }
    }
    setActiveIndex((prev) => prev + 1);
  }, [activeIndex, maxAmountOfSteps, onEndReached]);

  /**
   *
   * Values provided to the children.
   */
  const values = useMemo(
    () => ({
      activeIndex,
      previousIndex,
      maxAmountOfSteps,
      state,
      setState,
      goToPreviousStep,
      goToNextStep,
      goToFirstStep,
      goToLastStep,
      goToStep,
    }),
    [
      activeIndex,
      previousIndex,
      maxAmountOfSteps,
      state,
      goToPreviousStep,
      goToNextStep,
      goToFirstStep,
      goToLastStep,
      goToStep,
    ]
  );

  /**
   *
   * Render a header component if any and valid.
   */
  const renderHeader = useMemo(() => {
    if (!header) {
      return null;
    } else if (!React.isValidElement(header(values))) {
      throw new Error('Invalid header component passed to the wizard.');
    } else {
      return header(values);
    }
  }, [header, values]);

  /**
   *
   * Render a footer component if any and valid.
   */
  const renderFooter = useMemo(() => {
    if (!footer) {
      return null;
    } else if (!React.isValidElement(footer(values))) {
      throw new Error('Invalid footer component passed to the wizard.');
    } else {
      return footer(values);
    }
  }, [footer, values]);

  /**
   *
   * Render the current step.
   */
  const renderStep = useMemo(() => {
    const childrenCollection = getValidChildren(children);
    return childrenCollection[activeIndex - 1];
  }, [children, activeIndex]);

  /**
   *
   * Throw an error if the `initialIndex` prop is invalid.
   */
  useEffect(() => {
    if (initialIndex < 1 || initialIndex > maxAmountOfSteps) {
      throw new Error(
        `Invalid initial index. You must provide a value between 1 and ${maxAmountOfSteps}.`
      );
    }
  }, [initialIndex, maxAmountOfSteps]);

  return (
    <Wizard.Provider value={values}>
      {renderHeader}
      {renderStep}
      {renderFooter}
    </Wizard.Provider>
  );
};

/**
 *
 * Consumme the wizard provider.
 * @returns Wizard context values.
 */
export const useWizard = () => {
  const context = useContext(Wizard);
  if (!context) {
    throw new Error(
      'useWizard must be used within a WizardProvider component.'
    );
  }
  return context;
};
