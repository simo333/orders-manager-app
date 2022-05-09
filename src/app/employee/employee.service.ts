import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUrl = 'http://localhost:8080/employees';
  private employeeId!: number;

  getModelId(): number {
    return this.employeeId;
  }

  setEmployeeId(employeeId: number) {
    this.employeeId = employeeId;
  }

  constructor(private http: HttpClient) {
  }

  public findAllEmployees(params: any): Observable<any> {
    return this.http.get<any>(this.employeeUrl, {params});
  }

  public findEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.employeeUrl + `/${employeeId}`);
  }

  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeeUrl, employee);
  }

  public editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.employeeUrl + `/${employee.id}`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(this.employeeUrl + `/${employeeId}`);
  }
}
