import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardmoduleService } from '../dashboardmodule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Producto } from '../../interfaces/producto-response.interface';
import { ProductoContainer } from '../../interfaces/producto-container.interface';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  displayedColumns: string[] = ['id' , 'nombre', 'codReferencia', 'descripcion', 'dimensiones', 'acciones'];
  dataSource;
  productList: Producto[];
  product: ProductoContainer;

constructor(private dashService: DashboardmoduleService, public snackBar: MatSnackBar,
            public dialog: MatDialog, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getListProducts();
  }

  getListProducts() {
    this.dashService.getAllProducts().subscribe(listProducts => {
      console.log(listProducts);
      this.dataSource = new MatTableDataSource(listProducts.rows);
      this.dataSource.paginator = this.paginator;
    }, error =>  {
      alert('Error');
      console.log(error);
    });
  }

  openDialogAddProducto() {
    const dialogoAddProducto = this.dialog.open(ProductAddComponent, {
      data: { recurso: undefined }
    });

    dialogoAddProducto.afterClosed().subscribe(result => {
      this.getListProducts();
      console.log(result);
    });
  }

  openDialogEditProducto(element: Producto) {
    const dialogoEditProducto = this.dialog.open(ProductEditComponent, {
      data: { producto: element }
    });

    dialogoEditProducto.afterClosed().subscribe(result => {
      this.getListProducts();
    });
  }
/*
  openDialogRemoveResource(elemento: ResourceList) {
    const dialogRemove = this.dialog.open(GeneralDeleteComponent, {
      data: { recurso: elemento , id: elemento.id}
    });

    dialogRemove.afterClosed().subscribe(result => {
      if (result) {
        this.dashService.deleteResource(elemento.id).subscribe(listaRecursos => {
          this.getListRecursos();
         }, error => {
           console.log('Error.');
         });
      }
    });
  }
*/

}
