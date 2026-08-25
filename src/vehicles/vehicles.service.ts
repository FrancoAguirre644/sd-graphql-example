import { Injectable, NotFoundException } from '@nestjs/common';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleType } from './enums/vehicle-type.enum';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

@Injectable()
export class VehiclesService {
    private readonly vehicles: Vehicle[] = [
        {
            id: 1,
            licensePlate: 'AB123CD',
            brand: 'Toyota',
            model: 'Corolla',
            year: 2024,
            color: 'White',
            type: VehicleType.SEDAN,
            active: true,
        },
        {
            id: 2,
            licensePlate: 'AC456EF',
            brand: 'Ford',
            model: 'Ranger',
            year: 2023,
            color: 'Black',
            type: VehicleType.PICKUP,
            active: true,
        },
    ];

    findAll(): Vehicle[] {
        return this.vehicles;
    }

    findOne(id: number): Vehicle {
        const vehicle = this.vehicles.find(vehicle => vehicle.id === id);

        if (!vehicle) {
            throw new NotFoundException(`Vehicle with ID ${id} not found.`);
        }

        return vehicle;
    }

    create(input: CreateVehicleInput): Vehicle {
        const vehicle: Vehicle = {
            id: this.vehicles.length + 1,
            ...input,
            active: true,
        };

        this.vehicles.push(vehicle);

        return vehicle;
    }

    update(id: number, input: UpdateVehicleInput): Vehicle {
        const vehicle = this.findOne(id);

        Object.assign(vehicle, input);

        return vehicle;
    }

    delete(id: number): boolean {
        const vehicle = this.findOne(id);

        vehicle.active = false;

        return true;
    }

}