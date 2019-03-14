import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Distribuidor } from '../../interfaces/distribuidor-response.interface';
import { DistributorAddDto } from '../../dto/distributor-add.dto';
import { DashboardmoduleService } from '../dashboardmodule.service';

@Component({
  selector: 'app-distributor-edit',
  templateUrl: './distributor-edit.component.html',
  styleUrls: ['./distributor-edit.component.css']
})
export class DistributorEditComponent implements OnInit {


  public form: FormGroup;
  distributor: Distribuidor;
  distributors: Distribuidor[];

  constructor(private fb: FormBuilder, private dashService: DashboardmoduleService,
              public dialogRef: MatDialogRef<DistributorEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.distributor = this.data.distributor;
    this.getDistributors();
    this.form = this.fb.group({
      nombre: [this.data.distributor.nombre, Validators.compose([Validators.required])],
      email: [this.data.distributor.email, Validators.compose([Validators.required])],
      direccion: [this.data.distributor.direccion, Validators.compose([Validators.required])],
      telefono: [this.data.distributor.telefono, Validators.compose([Validators.required])]
    });
  }

  editDistributor() {
    const distributorEditDto: DistributorAddDto = this.form.value as DistributorAddDto;
    this.dashService.updateDistributor(this.distributor.id, distributorEditDto).subscribe(result => {
      this.dialogRef.close();
    });
  }

  getDistributors() {
    this.dashService.getAllDistributors().subscribe(result => {
      this.distributors = result.rows;
    });
  }
}
