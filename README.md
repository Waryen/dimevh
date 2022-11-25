# Dimevh 🧙‍♂️

Yet another wizard package for React...

## Installation

```
$ npm install dimevh
```

## Features

- A provider component which you pass your steps components as children.
- A consumer hook to... consume the methods and values of the wizard.

## Code examples

Here is some code examples of how to use the wizard.

### Wizard provider

This is the component to wrap your steps component with.

```js
export default function Index() {
  return (
    <WizardProvider>
      <Step1 />
      <Step2 />
      <Step3 />
    </WizardProvider>
  );
}
```

or with optionnal props.

```js
import Header from './header';
import Footer from './footer';

export default function Index() {
  const closeWizard = () => {
    // ...
  };

  return (
    <WizardProvider
      header={(props) => <Header {...props} />}
      footer={(props) => <Footer {...props} />}
      initialIndex={2}
      onStartReached={closeWizard}
      onEndReached={closeWizard}
    >
      <Step1 />
      <Step2 />
      <Step3 />
    </WizardProvider>
  );
}
```

### useWizard

This is the consummer hook, use it inside your steps components to retrieve the wizard functions and values.

```js
export default function Step1() {
  const {
    activeIndex,
    previousIndex,
    maxAmountOfSteps,
    goToPreviousStep,
    goToNextStep,
    goToFirstStep,
    goToLastStep,
    goToStep,
  } = useWizard();

  // ...
}
```

## Contributing

PRs are very welcome!  
Just open a PR and I will check it as soon as possible.
