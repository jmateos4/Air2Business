import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardmoduleService } from '../dashboardmodule.service';
import {ProductoAddDto} from '../../dto/product-add.dto';
import {ProductoContainer} from '../../interfaces/producto-container.interface';
import {Producto} from '../../interfaces/producto-response.interface';
import { Distribuidor } from '../../interfaces/distribuidor-response.interface';
import { Categoria } from '../../interfaces/categoria-response.interface';
import { forkJoin } from 'rxjs';
import { UploadService } from '../upload.service';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  @ViewChild('file') file;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Subir';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  public files: Set<File> = new Set();

  categorySelected;
  distributorSelected;
  form: FormGroup;
  allProducts: Producto[];
  allDistributors: Distribuidor[];
  allCategories: Categoria[];

  constructor(private fb: FormBuilder, private dashService: DashboardmoduleService, private uploadService: UploadService,
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

    onFilesAdded() {
      const files: { [key: string]: File } = this.file.nativeElement.files;
      this.files = new Set();
      for (const key in files) {
        if (!isNaN(parseInt(key, 10))) {
          this.files.add(files[key]);
        }
      }
    }

    closeDialog() {
      // if everything was uploaded already, just close the dialog
      if (this.uploadSuccessful) {
        return this.dialogRef.close();
      }

      // set the component state to "uploading"
      this.uploading = true;

      // start the upload and save the progress map
      this.progress = this.uploadService.upload(
        this.files, this.form.value, this.form.value.distributor, this.form.value.category);

      // tslint:disable-next-line:forin
      for (const key in this.progress) {
        this.progress[key].progress.subscribe(val => console.log(val));
      }

      // convert the progress map into an array
      const allProgressObservables = [];
      // tslint:disable-next-line:forin
      for (const key in this.progress) {
        allProgressObservables.push(this.progress[key].progress);
      }

      // Adjust the state variables

      // The OK-button should have the text "Finish" now
      this.primaryButtonText = 'Finalizar';

      // The dialog should not be closed while uploading
      this.canBeClosed = false;
      this.dialogRef.disableClose = true;

      // Hide the cancel-button
      this.showCancelButton = false;

      // When all progress-observables are completed...
      forkJoin(allProgressObservables).subscribe(end => {
        // ... the dialog can be closed again...
        this.canBeClosed = true;
        this.dialogRef.disableClose = false;

        // ... the upload was successful...
        this.uploadSuccessful = true;

        // ... and the component is no longer uploading
        this.uploading = false;

      });
    }
}
