import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassParamService {

  private cin!: string;

  constructor() { }

  getCin(): string {
    return this.cin;
  }

  setCin(cin: string): void {
    this.cin = cin;
  }}
