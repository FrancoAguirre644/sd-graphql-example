import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { VehicleType } from '../enums/vehicle-type.enum';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id!: number;

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

  @Field()
  active!: boolean;
}