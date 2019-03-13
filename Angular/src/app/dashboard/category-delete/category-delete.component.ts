import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {DashboardmoduleService} from '../../dashboard/dashboardmodule.service';


@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  checkedRobot: boolean;
  constructor(private dashService: DashboardmoduleService, public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<CategoryDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  captcha() {
    if (this.checkedRobot) {
      return true;
    } else {
      return false;
    }
  }

  deleteCat() {
    this.dashService.deleteCategory(this.data.id).subscribe(resp => {
      this.dialogRef.close('Confirm');
    }, error => this.snackBar.open('Error', 'Close', {duration: 2000}));
  }

}
