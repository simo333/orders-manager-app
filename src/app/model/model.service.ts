import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Model} from "./model";


@Injectable()
export class ModelService {

  private modelsUrl = 'http://localhost:8080/models';
  private modelId!: number;

  getModelId(): number {
    return this.modelId;
  }

  setModelId(modelId: number) {
    this.modelId = modelId;
  }

  constructor(private http: HttpClient) {
  }

  public findAllModels(params: any): Observable<any> {
    return this.http.get<any>(this.modelsUrl, {params});
  }

  public findModel(modelId: number): Observable<Model> {
    return this.http.get<Model>(this.modelsUrl + `/${modelId}`);
  }

  public saveModel(model: Model): Observable<Model> {
    return this.http.post<Model>(this.modelsUrl, model);
  }

  public editModel(model: Model): Observable<Model> {
    return this.http.put<Model>(this.modelsUrl + `/${model.id}`, model);
  }

  public deleteModel(modelId: number): Observable<void> {
    return this.http.delete<void>(this.modelsUrl + `/${modelId}`);
  }
}
