export class LogMessage {
  processId: number;
  text: string;
  isError: boolean;
  isDone: boolean;

  public constructor() {
  }

  public assign(input: any): void {

    this.processId = input.ProcessId;
    this.text = input.Text;
    this.isError = input.IsError;
    this.isDone = input.IsDone;
  }
}
