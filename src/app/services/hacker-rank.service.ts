import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HackerRankService {

  url = `https://reign-back.herokuapp.com/posts/`;
  constructor(private _HttpClient: HttpClient) { }

  get(params:any):Observable<any>{
    const { limit, search, filterBy } = params;
    return this._HttpClient.get(this.url,{params});
  }

  delete(_id:string):Observable<any>{
    return this._HttpClient.delete(`${this.url}${_id}`);
  }
}
