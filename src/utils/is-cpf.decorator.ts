import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

export function IsCpf(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsCpf',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return cpf.isValid(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} deve ser um CPF válido.`;
                },
            },
        });
    };
}