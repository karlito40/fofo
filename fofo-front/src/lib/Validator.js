import * as validatorStrategy from 'validator';

export const IsIn = (hasToContains) => (value) => {
  return {
    isValid: hasToContains.includes(value)
  };
}

export const IsEmail = () => (value) => {
  return {
    isValid: value && typeof value == "string" && validatorStrategy.isEmail(value),
    message: 'Email invalide.'
  };
}

export const MinLength = (min) => (value) => {
  return {
    isValid: value && value.length >= min,
    message: `Renseignez au moins ${min} caractères.`
  };
}

export const Required = () => (value) => {
  return {
    isValid: value && value.length > 0,
    message: 'Champ requis'
  };
}

export const Passed = () => (value) => {
  return {
    isValid: true
  };
}

export function validateChange(component, options, e) {
  const afterValidation = options.afterValidation || (() => {});
  const beforeValidation = options.beforeValidation || (() => {});
  const { name, value } = e.target;
  const { validator } = options;

  beforeValidation(name, value);

  const validatorResponse = validator(value);
  const errorName = `${name}Error`;
  if(!validatorResponse.isValid) {
    component.setState({ [errorName]: validatorResponse.message });
    return false;
  } 
  
  component.setState({ [errorName]: false });
  afterValidation(name, value);
  return true;
}

export function emulateChangeEvent(name, value) {
  return {target: {name, value}};
}