import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
export declare class EventsGateway {
    server: any;
    onEvent(client: any, data: any): Observable<WsResponse<number>>;
}
