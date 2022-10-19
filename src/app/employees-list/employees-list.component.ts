import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Employee} from "../services/employee/employee";
import {JobPosition} from "../services/job-position/jobPosition";
import {Router} from "@angular/router";
import {DOCUMENT, Location} from "@angular/common";
import {EmployeeService} from "../services/employee/employee.service";
import {JobPositionService} from "../services/job-position/job-position.service";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent implements OnInit {
  employees!: Employee[];
  employee: Employee = new Employee();
  actualEmployeeId!: number;
  jobPositions!: JobPosition[];

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  @ViewChild("closeCEButton") closeCEButton: any;
  @ViewChild("closeDEButton") closeDEButton: any;
  @ViewChild("closeEEButton") closeEEButton: any;

  constructor(private employeeService: EmployeeService,
              private jobPositionService: JobPositionService,
              private router: Router,
              private location: Location,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.retrieveEmployees();
    this.getAllJobPositions();
  }

  //Assigns found employee (by employeeId) to the local variable this.employee. It uses employeeService's method findEmployee
  getEmployee(employeeId: number){
    this.employeeService.findEmployee(employeeId).subscribe(response => {
      this.employee = response;
      console.log("ModelListComponent.getModel() -> " + this.employee.name);
    });
  }

  //Get employees  with page number and page size params
  retrieveEmployees() : void {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.employeeService.findAllEmployees(params).subscribe(response => {
      const {content, totalElements} = response;
      this.employees = content;
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
    this.retrieveEmployees();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveEmployees();
  }

  routeToEmployeeDetails(employeeId: number) {

  }

  setActualEmployeeId(employeeId: number) {
    this.actualEmployeeId = employeeId;
    console.log("Actual employeeId: " + this.actualEmployeeId);
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.actualEmployeeId).subscribe();
    console.log("Employee deleted.");
    this.closeDEButton.nativeElement.click();
    this.reload();
  }

  //JobPositionService
  getAllJobPositions() {
    this.jobPositionService.findAllJobPositions().subscribe(response => {
      this.jobPositions = response;
      console.log(response);
    })
  }

  //RELOADING "List Employees" table
  reload() {
    this.router.navigateByUrl("/all-employees", {skipLocationChange: true}).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())])
    })
  }

  createEmployee() {
    this.employeeService.saveEmployee(this.employee).subscribe(response => {
      console.log(response);
    });
    this.closeCEButton.nativeElement.click();
    this.reload();
  }

  editEmployee() {
    this.employeeService.editEmployee(this.employee).subscribe(response => {
      console.log(response);
    });
    this.closeEEButton.nativeElement.click();
    this.reload();
  }
}
