import { Field, InputType, Int } from '@nestjs/graphql';
import { VehicleType } from '../enums/vehicle-type.enum';

@InputType()
export class CreateVehicleInput {
  @Field()
  licensePlate!: string;

  @Field()
  brand!: string;

  @Field()
  model!: string;

  @Field(() => Int)
  year!: number;

  @Field()
  color!: string;

  @Field(() => VehicleType)
  type!: VehicleType;
}