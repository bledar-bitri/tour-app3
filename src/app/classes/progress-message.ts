import {LogMessage} from './log-message';
export class ProgressMessage extends LogMessage {
  progressPercent: number;

  public constructor() {
    super();
  }

  public assign (input: any): void {
    super.assign(input);
    this.progressPercent = input.ProgressPercent;
  }
}
