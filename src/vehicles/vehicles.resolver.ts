import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Vehicle } from './types/vehicle.type';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

@Resolver(() => Vehicle)
export class VehiclesResolver {
    constructor(private readonly vehiclesService: VehiclesService) { }

    @Query(() => [Vehicle])
    async vehicles(): Promise<Vehicle[]> {
        return this.vehiclesService.findAll();
    }

    @Query(() => Vehicle)
    async vehicle(@Args('id', { type: () => Int }) id: number): Promise<Vehicle> {
        return this.vehiclesService.findOne(id);
    }

    @Query(() => [Vehicle])
    async searchVehicles(@Args('search') search: string): Promise<Vehicle[]> {
        return this.vehiclesService.search(search);
    }

    @Mutation(() => Vehicle)
    async createVehicle(@Args('input') input: CreateVehicleInput): Promise<Vehicle> {
        return this.vehiclesService.create(input);
    }

    @Mutation(() => Vehicle)
    async updateVehicle(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateVehicleInput): Promise<Vehicle> {
        return this.vehiclesService.update(id, input);
    }

    @Mutation(() => Boolean)
    async deleteVehicle(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        return this.vehiclesService.delete(id);
    }
}