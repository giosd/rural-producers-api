import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

interface FarmLike {
  totalArea: number;
  farmingArea: number;
  vegetationArea: number;
}

export function IsValidArea(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidArea',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments): boolean {
          const farm = args.object as FarmLike;

          if (
            typeof farm.totalArea !== 'number' ||
            typeof farm.farmingArea !== 'number' ||
            typeof farm.vegetationArea !== 'number'
          ) {
            return false;
          }

          return farm.totalArea >= farm.farmingArea + farm.vegetationArea;
        },

        defaultMessage(args: ValidationArguments): string {
          const farm = args.object as FarmLike;
          return `A soma de farmingArea (${farm.farmingArea}) e vegetationArea (${farm.vegetationArea}) excede a totalArea (${farm.totalArea})`;
        },
      },
    });
  };
}
