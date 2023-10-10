export class typeDiplome{
  private _idTypeDiplome! : number;
  private _typeDiplome! : string;


  constructor() {}

  get idTypeDiplome(): number {
    return this._idTypeDiplome;
  }

  set idTypeDiplome(value: number) {
    this._idTypeDiplome = value;
  }

  get typeDiplome(): string {
    return this._typeDiplome;
  }

  set typeDiplome(value: string) {
    this._typeDiplome = value;
  }
}
