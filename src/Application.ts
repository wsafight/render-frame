export default class Application {
  protected running: boolean = false;
  protected requestId: number = -1
  protected startTime: number;
  protected lastTime: number;


  public start() {
    if (!this.running) {
      this.running = true;

      this.startTime = -1
      this.lastTime = -1
      this.requestId = requestAnimationFrame((elapsedMsec: number): void => {
        this.step(elapsedMsec)
      })
    }
  }

  public stop() {
    if (this.running) {
      this.running = false

      this.startTime = -1
      this.lastTime = -1

      cancelAnimationFrame(this.requestId)
      this.requestId = -1
    }
  }

  public isRunning(): boolean {
    return this.running
  }

  protected step(timeStamp: number): void {
    if (this.startTime === -1) {
      this.startTime = timeStamp
    }
    if (this.lastTime === -1) {
      this.lastTime = timeStamp
    }
    let elapsedMsec: number = timeStamp - this.startTime
    let intervalSec: number = (timeStamp - this.lastTime) / 1000
    this.lastTime = timeStamp

    this.update(elapsedMsec, intervalSec)
    this.render()

    requestAnimationFrame((elapsedMsec: number): void => {
      this.step(elapsedMsec)
    })
  }

  protected update(elapsedMsec: number, intervalSec: number): void {
    throw new Error('')
  }

  protected render(): void {
    throw new Error()
  }
}