import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleEntity]),
  ],
  providers: [VehiclesResolver, VehiclesService],
})
export class VehiclesModule {}