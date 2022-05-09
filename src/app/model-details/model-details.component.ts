import {Component, OnInit} from '@angular/core';
import {ModelService} from "../model/model.service";
import {Model} from "../model/model";

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {

  model: Model = new Model();
  actualModelId!: number;

  constructor(private modelService: ModelService) {

  }

  ngOnInit(): void {
    this.getModel(this.modelService.getModelId());
  }

  //Assigns found model (by modelId) to the local variable this.model. It uses modelService's method findModel
  getModel(modelId: number) {
    this.modelService.findModel(modelId).subscribe(response => {
      this.model = response;
      console.log("ModelDetailsComponent.getModel() -> " + this.model.name);
    });
  }

  // Set modelId from model list to provide it for deleteModel() method
  setActualModelId(modelId: number) {
    this.actualModelId = modelId;
    console.log("Actual modelId: " + this.actualModelId);
  }

}
