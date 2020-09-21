import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BmManagementService } from '../services';
import { BModel } from '../models/mbModel';

@Component({
  selector: 'app-mb-management',
  templateUrl: './mb-management.component.html',
  styleUrls: ['./mb-management.component.css'],
  providers: [BmManagementService]
})
export class MbManagementComponent implements OnInit {

  constructor(public bmService: BmManagementService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.bmService.selectedBom = {

      _id: "",
      type: "",
      title: "",
      author: "",
      edition: "",
      key_words: "",
      description: "",
      frequency: "",
      theme: "",
      published: "",
      copies: "",
      available: ""

    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.bmService.postBom(form.value).subscribe((res) => {
        console.log(form);
        
        this.resetForm(form);
        this.refreshEmployeeList();
      });
    }
    else { 
      this.bmService.putBom(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
      });
    }
  }

  refreshEmployeeList()  {
    this.bmService.getBomsList().subscribe((res) => {
    
      this.bmService.boms = res.foundBoms as BModel[];

    });
  }

  onEdit(bom: BModel) {
    this.bmService.selectedBom = bom;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.bmService.deleteBom(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
      });
    }
  }
  
  bookType(typB = "book") {

    this.bmService.selectedBom.type = typB

  }

  magazineType(typM = "magazine") {


    this.bmService.selectedBom.type = typM

  }

}
