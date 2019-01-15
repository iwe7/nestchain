import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class OnLine {
  isOnLine: boolean = false;

  onLine() {
    this.isOnLine = true;
  }

  ofLine() {
    this.isOnLine = false;
  }
}
