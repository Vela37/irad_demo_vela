export class User {
  constructor(
    public userid: string,
    public name: string,
    public role: string,
    public dept: string, 
    public state_code: string,
    public district_code: string,
    public station_code: string,
    public office_id:string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
