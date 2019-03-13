import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../../interfaces/categoria-response.interface';
import { CategoryAddDto } from '../../dto/category-add.dto';
import { DashboardmoduleService } from '../dashboardmodule.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  public form: FormGroup;
  categoria: Categoria;
  categorias: Categoria[];

  constructor(private fb: FormBuilder, private dashService: DashboardmoduleService,
              public dialogRef: MatDialogRef<CategoryEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.categoria = this.data.categoria;
    this.getCategories();
    this.form = this.fb.group({
      nombre: [this.data.categoria.nombre, Validators.compose([Validators.required])]
    });
  }

  editCategory() {
    const categoryEditDto: CategoryAddDto = this.form.value as CategoryAddDto;
    this.dashService.updateCategory(this.categoria.id, categoryEditDto).subscribe(result => {
      this.dialogRef.close();
    });
  }

  getCategories() {
    this.dashService.getAllCategories().subscribe(result => {
      this.categorias = result.rows;
    });
  }
}
