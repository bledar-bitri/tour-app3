import {  Injectable,  EventEmitter} from '@angular/core';

import {  GetClockTime } from '../classes/get-clock-time';
import {environment} from '../../environments/environment';
import {ProgressMessage} from '../classes/progress-message';
import { hubConnection } from 'signalr-shimmy'

@Injectable()
export class SignalRService {

  // Declare the variables
  private proxy: any;
  private proxyName = 'routeHub';
  private connection: any;

  // create the Event Emitter
  public messageReceived: EventEmitter < GetClockTime > ;
  public progressReceived: EventEmitter < ProgressMessage > ;
  public connectionEstablished: EventEmitter < Boolean > ;
  public connectionExists: Boolean;

  constructor() {

    // Constructor initialization
    this.connectionEstablished = new EventEmitter < Boolean > ();
    this.messageReceived = new EventEmitter < GetClockTime > ();
    this.progressReceived = new EventEmitter < ProgressMessage > ();
    this.connectionExists = false;

    // create hub connection
    this.connection = hubConnection(environment.url);
    // connection.qs = { 'access_token': 'SECRET_TOKEN' };

    // create new proxy as name already given in top
    this.proxy = this.connection.createHubProxy(this.proxyName);

    // register on server events
    this.registerOnServerEvents();

    // call the connection start method to start the connection to send and receive events.
    console.log('Starting connection to signalr');
    this.startConnection();
  }

  // method to hit from client
  public sendTime() {

    // server side hub method using proxy.invoke with method name pass as param
    this.proxy.invoke('GetRealTime');
  }
  // check in the browser console for either signalr connected or not
  private startConnection(): void {

    this.connection.start().done((data: any) => {
      console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
      this.connectionEstablished.emit(true);
      this.connectionExists = true;
    }).fail((error: any) => {
      console.log('Could not connect ' + error);
      this.connectionEstablished.emit(false);
    });
  }
  private registerOnServerEvents(): void {

    this.proxy.on('setRealTime', (data: GetClockTime) => {
      console.log('received in SignalRService: ' + JSON.stringify(data));
      this.messageReceived.emit(data);
    });

    this.proxy.on('routeCalculationProgress', (data: ProgressMessage) => {
      console.log('received in SignalRService [routeCalculationProgress]: ' + JSON.stringify(data));
      this.progressReceived.emit(data);
    });
  }
}
