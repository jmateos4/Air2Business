import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardmoduleService } from '../dashboardmodule.service';
import {CategoryAddDto} from '../../dto/category-add.dto';
import {CategoriaContainer} from '../../interfaces/categoria-container.interface';
import {Categoria} from '../../interfaces/categoria-response.interface';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {


  form: FormGroup;
  allProducts: Categoria[];

  constructor(private fb: FormBuilder, private dashService: DashboardmoduleService,
              public dialogRef: MatDialogRef<CategoryAddComponent>) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ({
      nombre: [null, Validators.compose([Validators.required])],
    });
   }


   addCategory() {
     const categoryAdd: CategoryAddDto = this.form.value as CategoryAddDto;
     this.dashService.createCategory(categoryAdd).subscribe(
      product => {
        this.dialogRef.close();
        }
      );
    }
}
