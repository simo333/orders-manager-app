import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {FurnitureType} from "./furnitureType";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FurnitureTypeService {
  private furnitureTypesUrl = 'http://localhost:8080/furniture-types';

  constructor(private http: HttpClient) { }

  public getFurnitureTypes(): Observable<FurnitureType[]> {
    return this.http.get<FurnitureType[]>(this.furnitureTypesUrl);
  }

  public getFurnitureType(typeId: number): Observable<FurnitureType> {
    return this.http.get<FurnitureType>(this.furnitureTypesUrl);
  }

  public addFurnitureType(type: FurnitureType): Observable<FurnitureType> {
    return this.http.post<FurnitureType>(this.furnitureTypesUrl, type);
  }

  public updateFurnitureType(type: FurnitureType): Observable<FurnitureType> {
    return this.http.put<FurnitureType>(this.furnitureTypesUrl + `/${type.id}`, type);
  }

  public deleteFurnitureType(typeId: number): Observable<void> {
    return this.http.delete<void>(this.furnitureTypesUrl + `${typeId}`)
  }
}
