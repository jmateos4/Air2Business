import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardmoduleService } from '../dashboardmodule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Distribuidor } from '../../interfaces/distribuidor-response.interface';
import { DistribuidorContainer } from '../../interfaces/distribuidor-container.interface';
import { DistributorAddComponent } from '../distributor-add/distributor-add.component';
import { DistributorEditComponent } from '../distributor-edit/distributor-edit.component';
import { DistributorDeleteComponent } from '../distributor-delete/distributor-delete.component';

@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.css']
})
export class DistributorListComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'email', 'direccion', 'telefono', 'acciones'];
  dataSource;
  distributorList: Distribuidor[];
  distributor: DistribuidorContainer;

constructor(private dashService: DashboardmoduleService, public snackBar: MatSnackBar,
            public dialog: MatDialog, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getListDistributors();
  }

  getListDistributors() {
    this.dashService.getAllDistributors().subscribe(listDistributors => {
      console.log(listDistributors);
      this.dataSource = new MatTableDataSource(listDistributors.rows);
      this.dataSource.paginator = this.paginator;
    }, error =>  {
      alert('Error');
      console.log(error);
    });
  }

  openDialogAddDistributor() {
    const dialogoAddDistributor = this.dialog.open(DistributorAddComponent, {
      data: { recurso: undefined }
    });

    dialogoAddDistributor.afterClosed().subscribe(result => {
      this.getListDistributors();
      console.log(result);
    });
  }

  openDialogEditDistributor(element: Distribuidor) {
    const dialogoEditDistributor = this.dialog.open(DistributorEditComponent, {
      data: { distributor : element }
    });

    dialogoEditDistributor.afterClosed().subscribe(result => {
      this.getListDistributors();
    });
  }
  openDialogRemoveDistributor(element: Distribuidor) {
    const dialogDeleteDistributor = this.dialog.open(DistributorDeleteComponent, {
      data: { id: element.id }
    });

    dialogDeleteDistributor.afterClosed().subscribe(result => {
      this.getListDistributors();
    });
  }
}
