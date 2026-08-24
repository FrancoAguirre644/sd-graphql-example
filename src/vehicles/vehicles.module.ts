import { Module } from '@nestjs/common';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

@Module({
  providers: [VehiclesResolver, VehiclesService],
})
export class VehiclesModule {}