import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

@Resolver(() => Vehicle)
export class VehiclesResolver {
    constructor(private readonly vehiclesService: VehiclesService) { }

    @Query(() => [Vehicle])
    vehicles(): Vehicle[] {
        return this.vehiclesService.findAll();
    }

    @Query(() => Vehicle)
    vehicle(@Args('id', { type: () => Int }) id: number): Vehicle | undefined {
        return this.vehiclesService.findOne(id);
    }

    @Mutation(() => Vehicle)
    createVehicle(@Args('input') input: CreateVehicleInput): Vehicle {
        return this.vehiclesService.create(input);
    }

    @Mutation(() => Vehicle)
    updateVehicle(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateVehicleInput,
    ): Vehicle {
        return this.vehiclesService.update(id, input);
    }
}