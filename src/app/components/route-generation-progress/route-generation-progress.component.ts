import { Component, OnInit } from '@angular/core';
import { RouteGenerationProgressService } from '../../services/route-generation-progress.service';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';
import {ProgressMessage} from '../../classes/progress-message';
import {City} from '../../classes/city';
import {TourService} from '../../services/tour.service';



@Component({
  selector: 'app-route-generation-progress',
  templateUrl: './route-generation-progress.component.html',
  styleUrls: ['./route-generation-progress.component.css'],
  providers: [RouteGenerationProgressService, TourService]
})
export class RouteGenerationProgressComponent implements OnInit {

  message: ProgressMessage;
  subscription: Subscription;
  calculatedTour: City[];

  progressPercent = 0;

  constructor(private progressService: RouteGenerationProgressService,
              private _tourService: TourService) {
  }

  ngOnInit() {
    const timer = Observable.timer(2000, 1000);
    this.subscription = timer.subscribe( t => {
      this.getProgress();
    });
  }
  getProgress() {
    this.progressService.getProgress().subscribe(data => this.updateProgress(data));
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
    this._tourService.getTour().subscribe(data => this.calculatedTour = data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
