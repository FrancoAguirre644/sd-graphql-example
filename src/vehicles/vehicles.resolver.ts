import { Query, Resolver } from '@nestjs/graphql';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle])
  vehicles(): Vehicle[] {
    return this.vehiclesService.findAll();
  }
}