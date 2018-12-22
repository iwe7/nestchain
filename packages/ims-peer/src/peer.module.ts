import { Module } from 'ims-nest';
import { ImsPeerController } from './peer.controller';
import { ImsPeerService } from './peer.service';

@Module({
  controllers: [ImsPeerController],
  providers: [ImsPeerService],
})
export class ImsPeerModule {}
