import {Component, NgZone} from '@angular/core';
import { RouteGenerationProgressService } from '../../services/route-generation-progress.service';
import {ProgressMessage} from '../../classes/progress-message';
import {City} from '../../classes/city';
import {TourService} from '../../services/tour.service';
import {SignalRService} from '../../services/signal-r.service';



@Component({
  selector: 'app-route-generation-progress',
  templateUrl: './route-generation-progress.component.html',
  styleUrls: ['./route-generation-progress.component.css'],
  providers: [RouteGenerationProgressService, TourService]
})
export class RouteGenerationProgressComponent {

  message: ProgressMessage;
  calculatedTour: City[];
  progressPercent = 0;

  constructor(
              private _signalRService: SignalRService,
              private _tourService: TourService,
              private _ngZone: NgZone) {

    // this can subscribe for events
    this.subscribeToEvents();
  }

  updateProgress(receivedMessage: ProgressMessage) {
    if (receivedMessage != null && receivedMessage.text !== '') {
      this.message = receivedMessage;
      this.progressPercent = this.message.progressPercent;
      if (this.message.isDone) {
        this.getTour();
      }
    }
  }

  getTour() {
    this._tourService.getTour().subscribe(data => {

      data.forEach(city => {
        console.log(city.name);
      });

      this.calculatedTour = data;
    });
  }

  private subscribeToEvents(): void {
    // if connection exists it can call of method.
    this._signalRService.connectionEstablished.subscribe(() => {
      console.log('Connected to signal r');
    });

    this._signalRService.progressReceived.subscribe((message: ProgressMessage) => {
      this._ngZone.run(() => {

        console.log('progress message: ' + JSON.stringify(message));
        console.log('message.text: ' + message.text);

        const pm: ProgressMessage = new ProgressMessage();
        pm.assign(message);
        this.updateProgress(pm);
        console.log('progressMessages text: ' + pm.text);
      });
    });
  }
}
