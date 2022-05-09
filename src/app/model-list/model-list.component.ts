import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Model} from "../model/model";
import {ModelService} from "../model/model.service";
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {FurnitureType} from "../furniture-type/furnitureType";
import {FurnitureTypeService} from "../furniture-type/furniture-type.service";

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {

  models!: Model[];
  model: Model = new Model();
  actualModelId!: number;
  furnitureTypes!: FurnitureType[];

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  @ViewChild("closeCMButton") closeCMButton: any;
  @ViewChild("closeDMButton") closeDMButton: any;
  @ViewChild("closeEMButton") closeEMButton: any;

  constructor(private modelService: ModelService,
              private furnitureTypeService: FurnitureTypeService,
              private router: Router,
              private location: Location,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() : void {
    this.retrieveModels();
    this.getAllFurnitureTypes();

  }

  //Assigns found model (by modelId) to the local variable this.model. It uses modelService's method findModel
  getModel(modelId: number){
    this.modelService.findModel(modelId).subscribe(response => {
      this.model = response;
      console.log("ModelListComponent.getModel() -> " + this.model.name);
    });
  }

  //Get models  with page number and page size params
  retrieveModels() : void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.modelService.findAllModels(params).subscribe(response => {
      const {content, totalElements} = response;
      this.models = content;
      this.count = totalElements;
      console.log(response);
    });
  }


  //Pagination
  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if(page) {
      params['page'] = page - 1;
    }

    if(pageSize) {
      params['size'] = pageSize;
    }
    return params;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveModels();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveModels();
  }

  //Go To Model Details page
  routeToModelDetails(modelId: number): void {
    this.modelService.setModelId(modelId);
    this.router.navigateByUrl("/model-details");
  }

  // Create Model Modal
  createModel() {
    this.modelService.saveModel(this.model).subscribe(response => {
      console.log(response);
      });
    this.closeCMButton.nativeElement.click();
    this.reload();
  }

  // Edit Model Modal
  editModel() {
    this.modelService.editModel(this.model).subscribe(response => {
      console.log(response);
    })
    this.closeEMButton.nativeElement.click();
    this.reload();
  }

  // Delete button in the list of models
  deleteModel() {
    this.modelService.deleteModel(this.actualModelId).subscribe();
    console.log("Model deleted.");
    this.closeDMButton.nativeElement.click();
    this.reload();
  }
  // Set modelId from model list to provide it for deleteModel() method
  setActualModelId(modelId: number) {
    this.actualModelId = modelId;
    console.log("Actual modelId: " + this.actualModelId);
  }

  //RELOADING "List Models" table
  reload() {
    this.router.navigateByUrl("/all-models", {skipLocationChange: true}).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())])
    })
  }

  //FurnitureTypeService
  getAllFurnitureTypes() {
    this.furnitureTypeService.getFurnitureTypes().subscribe(response => {
      this.furnitureTypes = response;
      console.log(response);
    })
  }
}
