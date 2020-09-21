import { Component, OnInit } from '@angular/core';


import { BmManagementService } from '../../services/bm-management.service';
import { BModel } from '../../models/mbModel';
import { ManagementService } from '../../services/management.service';

@Component({
  selector: 'app-books-display',
  templateUrl: './books-display.component.html',
  styleUrls: ['./books-display.component.css'],
  providers: [BmManagementService]
})
export class BooksDisplayComponent implements OnInit {

  constructor(public bmService: BmManagementService, public managementService: ManagementService) { }

  ngOnInit(): void {

    this.refreshBooksList();
    
  }

  refreshBooksList() {
    this.bmService.getBomsList().subscribe((res) => {
    
      this.bmService.boms = res.foundBoms as BModel[];
    });
  }

  onBorrow(bom: BModel) {

    this.managementService.putBorrowBook(bom).subscribe((
      res => {

        this.refreshBooksList();

      }
    ))

  }

}
