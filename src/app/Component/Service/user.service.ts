import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8081/api/users/';

  saveUser(payload : any):Observable <any> {
  return this.http.post<any> (`${this.apiUrl}save/user`, payload);
  }

   getUserUserNameAndUserPassword(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('userName', payload.userName);        // Correctly appending 'userName'
    formData.append('userPassword', payload.userPassword); // Correctly appending 'userPassword'
    return this.http.post(`${this.apiUrl}findByUserNameAndUserPassword`, formData, { responseType: 'text' });
    }
  
    getUser(userName : any):Observable <any>{
      return this.http.get<any>(`${this.apiUrl}findByUserName/${userName}`);
    }

  
}
