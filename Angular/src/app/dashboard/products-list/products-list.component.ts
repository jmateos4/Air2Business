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
import { ProductDeleteComponent } from '../product-delete/product-delete.component';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  displayedColumns: string[] = ['foto' , 'nombre', 'codReferencia', 'descripcion', 'dimensiones', 'Distribuidor', 'Categoria', 'acciones'];
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

  public openDialogAddProducto() {
    const dialogRef = this.dialog.open(ProductAddComponent,
      {
        width: '500px',
        data: { id: 1 }
      });

    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open(
        'El fichero se subió correctamente', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.getListProducts();
    });
  }

  openDialogEditProducto(element: Producto) {
    const dialogoEditProducto = this.dialog.open(ProductEditComponent, {
      width: '500px',
      data: { producto: element }
    });

    dialogoEditProducto.afterClosed().subscribe(result => {
      this.getListProducts();
    });
  }

  openDialogRemoveProducto(element: Producto) {
    const dialogDeleteProducto = this.dialog.open(ProductDeleteComponent, {
      data: { id: element.id }
    });

    dialogDeleteProducto.afterClosed().subscribe(result => {
      this.getListProducts();
    });
  }

}
