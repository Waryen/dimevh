import { ReactElement } from 'react';

export type WizardProps = {
  header?: ReactElement;
  footer?: ReactElement;
  initialIndex?: number;
  onStartReached?: () => void;
  onEndReached?: () => void;
};

export type WizardContext = {
  activeIndex: number;
  previousIndex: number | undefined;
  goToStep: (step: number) => void;
  goToFirstStep: () => void;
  goToLastStep: () => void;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
};
