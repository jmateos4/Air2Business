import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardmoduleService } from '../dashboardmodule.service';
import {ProductoAddDto} from '../../dto/product-add.dto';
import {ProductoContainer} from '../../interfaces/producto-container.interface';
import {Producto} from '../../interfaces/producto-response.interface';
import { Distribuidor } from '../../interfaces/distribuidor-response.interface';
import { Categoria } from '../../interfaces/categoria-response.interface';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  form: FormGroup;
  allProducts: Producto[];
  allDistributors: Distribuidor[];
  allCategories: Categoria[];

  constructor(private fb: FormBuilder, private dashService: DashboardmoduleService,
              public dialogRef: MatDialogRef<ProductAddComponent>) { }

  ngOnInit() {
    this.getAllDistributors();
    this.getAllCategories();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ({
      nombre: [null, Validators.compose([Validators.required])],
      codReferencia: [null, Validators.compose([Validators.required])],
      descripcion: [null, Validators.compose([Validators.required])],
      dimensiones: [null, Validators.compose([Validators.required])],
      distributor: [null, Validators.compose([Validators.required])],
      category: [null, Validators.compose([Validators.required])]
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

    getAllDistributors() {
      this.dashService.getAllDistributors().subscribe(r => this.allDistributors = r.rows);
    }

    getAllCategories() {
      this.dashService.getAllCategories().subscribe(r => this.allCategories = r.rows);
    }
}
