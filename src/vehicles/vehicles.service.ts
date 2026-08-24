import { Injectable } from '@nestjs/common';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleType } from './enums/vehicle-type.enum';

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
}