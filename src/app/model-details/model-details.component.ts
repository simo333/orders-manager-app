import {Component, OnInit} from '@angular/core';
import {ModelService} from "../services/model/model.service";
import {Model} from "../services/model/model";

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {

  model: Model = new Model();
  actualModelId: number;

  constructor(private modelService: ModelService) {
    this.actualModelId = this.modelService.getModelId();
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

}
