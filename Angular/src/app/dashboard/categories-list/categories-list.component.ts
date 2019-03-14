import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardmoduleService} from '../dashboardmodule.service';
import { MatPaginator, MatTableDataSource} from '@angular/material';
// import { CategoriesAddComponent } from '../categories-add/categories-add.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaContainer } from '../../interfaces/categoria-container.interface';
import { Categoria } from '../../interfaces/categoria-response.interface';
import { SessionService } from '../../session/sessionmodule.service';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})

export class CategoriesListComponent implements OnInit {

  displayedColumns: string[] = ['id' , 'name' , 'acciones' ];
  dataSource;
  categoriesList: Categoria[];
  category: CategoriaContainer;


  constructor(private dashService: DashboardmoduleService , public snackBar: MatSnackBar,
              public dialog: MatDialog, private sessionService: SessionService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getListaCategorias();
  }

  getListaCategorias() {
    this.dashService.getAllCategories().subscribe(listCategories => {
      console.log(listCategories);
      this.dataSource = new MatTableDataSource(listCategories.rows);
      this.dataSource.paginator = this.paginator;
    }, error =>  {
      alert('Error');
      console.log(error);
    });
  }

  openDialogAddCategory() {
    const dialogoAddCategory = this.dialog.open(CategoryAddComponent, {
      width: '450px',
      data: { recurso: undefined }
    });

    dialogoAddCategory.afterClosed().subscribe(result => {
      this.getListaCategorias();
      console.log(result);
    });
  }
  openDialogEditCategory(element: Categoria) {
    const dialogoEditCategoria = this.dialog.open(CategoryEditComponent, {
      width: '450px',
      data: { categoria: element }
    });

    dialogoEditCategoria.afterClosed().subscribe(result => {
      this.getListaCategorias();
    });
  }

   openDialogDeleteCategory(element: Categoria) {
    const dialogDeleteCategory = this.dialog.open(CategoryDeleteComponent, {
      data: { id: element.id }
    });

    dialogDeleteCategory.afterClosed().subscribe(result => {
      this.getListaCategorias();
    });
  }
}
