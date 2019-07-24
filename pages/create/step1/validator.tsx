import * as validator from "validator";
import { IFieldValidatorResult } from "../../../common/abstract/fieldValidatorResult";

export function validateName(input): IFieldValidatorResult {
  const messages: string[] = [];

  if (typeof input !== "string") {
    messages.push("Name is not a valid string");
  }

  if (!validator.isLength(input, { min: 1 })) {
    messages.push("The name field is empty");
  }

  if (!validator.isLength(input, { max: 50 })) {
    messages.push("Name should be 50 characters or less");
  }

  return { error: messages.length === 0, messages };
}

export function validateDescription(input): IFieldValidatorResult {
  const messages: string[] = [];

  if (typeof name !== "string") {
    messages.push("Description is not a valid string");
  }

  if (!validator.isLength(name, { max: 100 })) {
    messages.push("Description should be 100 characters or less");
  }

  return { error: messages.length === 0, messages };
}