import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobPosition} from "./jobPosition";

@Injectable({
  providedIn: 'root'
})
export class JobPositionService {
  private jobPositionsUrl = 'http://localhost:8080/job-positions';
  private jobPositionId!: number;

  getJobPositionId(): number {
    return this.jobPositionId;
  }

  setJobPositionId(modelId: number) {
    this.jobPositionId = modelId;
  }

  constructor(private http: HttpClient) {
  }

  public findAllJobPositions(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(this.jobPositionsUrl);
  }

  public findJobPosition(jobPositionId: number): Observable<JobPosition> {
    return this.http.get<JobPosition>(this.jobPositionsUrl + `/${jobPositionId}`);
  }

  public saveJobPosition(jobPosition: JobPosition): Observable<JobPosition> {
    return this.http.post<JobPosition>(this.jobPositionsUrl, jobPosition);
  }

  public editJobPosition(jobPosition: JobPosition): Observable<JobPosition> {
    return this.http.put<JobPosition>(this.jobPositionsUrl + `/${jobPosition.id}`, jobPosition);
  }

  public deleteJobPosition(jobPositionId: number): Observable<void> {
    return this.http.delete<void>(this.jobPositionsUrl + `/${jobPositionId}`);
  }
}
