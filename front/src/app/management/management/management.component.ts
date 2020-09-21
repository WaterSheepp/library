import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ManagementService } from '../../services';
import { UserM } from '../../models/management.model';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers: [ManagementService]
})
export class ManagementComponent implements OnInit {

  foundUsers: any[]

  constructor(public managementService: ManagementService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.managementService.selectedEmployee = {
      _id: "",
      user_name: "",
      name: "",
      sur_name: "",
      password: "",
      carnet: "",
      rol: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.managementService.postEmployee(form.value).subscribe((res) => {
        console.log(form);
        
        this.resetForm(form);
        this.refreshEmployeeList();
      });
    }
    else {
      this.managementService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
      });
    }
  }

  refreshEmployeeList() {
    this.managementService.getEmployeeList().subscribe((res) => {
    
      this.managementService.employees = res.foundUsers as UserM[];
    });
  }

  onEdit(emp: UserM) {
    this.managementService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.managementService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
      });
    }
  }

}


