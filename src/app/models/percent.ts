export class Percent {
  label:string;
  total:number;
  color:string;

  constructor(label:string, total:number, color:string){
    this.color = color;
    this.label = label;
    this.total = total;
  }
}
