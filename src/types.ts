import { Dispatch, ReactElement, SetStateAction } from 'react';

export type WizardProps = {
  header?: (props: WizardContext) => ReactElement<WizardContext>;
  footer?: (props: WizardContext) => ReactElement<WizardContext>;
  initialIndex?: number;
  onStartReached?: () => void;
  onEndReached?: () => void;
};

export type WizardContext = {
  activeIndex: number;
  previousIndex: number | undefined;
  state: unknown;
  setState: Dispatch<SetStateAction<unknown>>;
  goToStep: (step: number) => void;
  goToFirstStep: () => void;
  goToLastStep: () => void;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
};
