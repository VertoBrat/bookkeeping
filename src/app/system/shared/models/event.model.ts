export class PHTEvent {
  // noinspection JSAnnotator
  constructor(
    public type: string,
    public amount: number,
    public category: number,
    public date: string,
    public description: string,
    public id?: number
  ){}
}
