import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../interfaces/producto-response.interface';
import { ProductoAddDto } from '../../dto/product-add.dto';
import { DashboardmoduleService } from '../dashboardmodule.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public form: FormGroup;
  producto: Producto;
  productos: Producto[];

  constructor(private fb: FormBuilder, private dashService: DashboardmoduleService,
              public dialogRef: MatDialogRef<ProductEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.producto = this.data.producto;
    this.getProductos();
    this.form = this.fb.group({
      nombre: [this.data.producto.nombre, Validators.compose([Validators.required])],
      codReferencia: [this.data.producto.codReferencia, Validators.compose([Validators.required])],
      descripcion: [this.data.producto.descripcion, Validators.compose([Validators.required])],
      dimensiones: [this.data.producto.dimensiones, Validators.compose([Validators.required])]
    });
  }

  editProducto() {
    const productEditDto: ProductoAddDto = this.form.value as ProductoAddDto;
    this.dashService.updateProduct(this.producto.id, productEditDto).subscribe(result => {
      this.dialogRef.close();
    });
  }

  getProductos() {
    this.dashService.getAllProducts().subscribe(result => {
      this.productos = result.rows;
    });
  }
}
