import { Injectable, NotFoundException } from '@nestjs/common';
import { Vehicle } from './types/vehicle.type';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {

    constructor(
        @InjectRepository(VehicleEntity)
        private readonly vehicleRepository: Repository<VehicleEntity>,
    ) { }

    async findAll(): Promise<Vehicle[]> {
        const vehicles = await this.vehicleRepository.find();

        return vehicles;
    }

    async findOne(id: number): Promise<Vehicle> {
        const vehicle = await this.vehicleRepository.findOne({
            where: { id },
        });

        if (!vehicle) {
            throw new NotFoundException(`Vehicle with ID ${id} not found.`);
        }

        return vehicle;
    }

    async create(input: CreateVehicleInput): Promise<Vehicle> {
        const vehicle = this.vehicleRepository.create({
            ...input,
            active: true,
        });

        const savedVehicle = await this.vehicleRepository.save(vehicle);

        return savedVehicle
    }

    async update(id: number, input: UpdateVehicleInput): Promise<Vehicle> {
        const vehicle = await this.vehicleRepository.preload({
            id,
            ...input,
        });

        if (!vehicle) {
            throw new NotFoundException(`Vehicle with ID ${id} not found`);
        }

        const updatedVehicle = await this.vehicleRepository.save(vehicle);

        return updatedVehicle;
    }

    async delete(id: number): Promise<boolean> {
        const vehicle = await this.vehicleRepository.preload({
            id,
            active: false,
        });

        if (!vehicle) {
            throw new NotFoundException(`Vehicle with ID ${id} not found`);
        }

        await this.vehicleRepository.save(vehicle);

        return true;
    }
}