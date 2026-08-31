/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function validateCNPJ(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCNPJ',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (!value) return false;

          const cnpj = String(value).replace(/[^\d]/g, '');

          if (cnpj.length !== 14) return false;

          // Rejeita CNPJs com todos os dígitos iguais
          if (/^(\d)\1+$/.test(cnpj)) return false;

          // Validação dos dígitos verificadores
          const calcCheckDigit = (base: string, weights: number[]) => {
            const sum = base.split('').reduce((acc, digit, idx) => acc + Number(digit) * weights[idx], 0);
            const remainder = sum % 11;
            return remainder < 2 ? 0 : 11 - remainder;
          };

          const base = cnpj.substring(0, 12);
          const firstCheck = calcCheckDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
          const secondCheck = calcCheckDigit(base + firstCheck, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

          return cnpj.endsWith(`${firstCheck}${secondCheck}`);
        },

        defaultMessage(_args: ValidationArguments) {
          return 'CNPJ inválido';
        },
      },
    });
  };
}
