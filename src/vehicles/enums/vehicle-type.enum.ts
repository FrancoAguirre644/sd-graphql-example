import { registerEnumType } from '@nestjs/graphql';

export enum VehicleType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  PICKUP = 'PICKUP',
  COUPE = 'COUPE',
  HATCHBACK = 'HATCHBACK',
}

registerEnumType(VehicleType, {
  name: 'VehicleType',
});