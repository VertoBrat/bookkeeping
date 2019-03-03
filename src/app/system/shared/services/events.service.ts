import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../../../shared/core/base-api';
import {PHTEvent} from '../models/event.model';
import {Observable} from 'rxjs';

@Injectable()
export class EventsService extends BaseApi{

  constructor(public http: HttpClient) {
    super(http)
  }

  getEvents(): Observable<PHTEvent[]> {
   return this.get<PHTEvent[]>('events', null);
  }

  postEvent(event: PHTEvent): Observable<PHTEvent> {
    return this.post<PHTEvent>('events', event);
  }

}
