import { Module } from 'ims-nest';
import { ImsPeerModule } from 'ims-peer';
@Module({
  imports: [ImsPeerModule],
})
export class ImsChain {}
