import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModelListComponent} from "./model-list/model-list.component";
import {ModelDetailsComponent} from "./model-details/model-details.component";
import {EmployeesListComponent} from "./employees-list/employees-list.component";

const routes: Routes = [
  {path: 'models', component: ModelListComponent},
  //RELOADING "List Models" button
  {path: 'all-models', component: ModelListComponent},
  {path: 'model-details', component: ModelDetailsComponent},
  {path: 'employees', component: EmployeesListComponent},
  //RELOADING "List Employees" button
  {path: "all-employees", component: EmployeesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
