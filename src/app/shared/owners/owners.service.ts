import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public OWNER_API = this.API + '/owners';
  public CAR_API = this.API+ '/cool-cars';

  constructor(private http: HttpClient) { }

  get(id:string){
    return this.http.get(this.OWNER_API +'/'+id);
  }
  getOwners():Observable<any>{
    return this.http.get(this.OWNER_API);
  }
  save(owner:any):Observable<any>{
    let result:Observable<Object>;
    if(owner['href']){
      result= this.http.put(owner.href,owner);
    }else{
      result= this.http.post(this.OWNER_API,owner);
    }
    return result;
  }
  remove(href: string) {
    return this.http.delete(href);
  }
  
}
