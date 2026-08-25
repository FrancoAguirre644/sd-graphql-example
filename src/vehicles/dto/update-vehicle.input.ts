import { Field, InputType, Int } from '@nestjs/graphql';
import { VehicleType } from '../enums/vehicle-type.enum';

@InputType()
export class UpdateVehicleInput {
  @Field({ nullable: true })
  licensePlate?: string;

  @Field({ nullable: true })
  brand?: string;

  @Field({ nullable: true })
  model?: string;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field({ nullable: true })
  color?: string;

  @Field(() => VehicleType, { nullable: true })
  type?: VehicleType;

  @Field({ nullable: true })
  active?: boolean;
}