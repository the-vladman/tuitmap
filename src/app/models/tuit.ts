export class Tuit {
  coordinates:[number];

  constructor(response:any){
    this.coordinates = response.coordinates.coordinates;
  }
}
