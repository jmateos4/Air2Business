import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardmoduleService } from '../dashboardmodule.service';
import {ProductoAddDto} from '../../dto/product-add.dto';
import {ProductoContainer} from '../../interfaces/producto-container.interface';
import {Producto} from '../../interfaces/producto-response.interface';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  form: FormGroup;
  allProducts: Producto[];

  constructor(private fb: FormBuilder, private dashService: DashboardmoduleService,
              public dialogRef: MatDialogRef<ProductAddComponent>) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ({
      nombre: [null, Validators.compose([Validators.required])],
      codReferencia: [null, Validators.compose([Validators.required])],
      descripcion: [null, Validators.compose([Validators.required])],
      dimensiones: [null, Validators.compose([Validators.required])]
    });
   }


   addProducto() {
     const productoAdd: ProductoAddDto = this.form.value as ProductoAddDto;
     this.dashService.createProduct(productoAdd).subscribe(
      product => {
        this.dialogRef.close();
        }
      );
    }

}
