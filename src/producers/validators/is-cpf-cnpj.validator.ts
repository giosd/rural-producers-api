import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCpfOrCnpj',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return cpf.isValid(value) || cnpj.isValid(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `'${args.value}' não é um CPF ou CNPJ válido.`;
        },
      },
    });
  };
}
