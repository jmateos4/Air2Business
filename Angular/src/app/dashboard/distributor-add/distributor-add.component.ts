import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardmoduleService } from '../dashboardmodule.service';
import {DistributorAddDto} from '../../dto/distributor-add.dto';
import {DistribuidorContainer} from '../../interfaces/distribuidor-container.interface';
import {Distribuidor} from '../../interfaces/distribuidor-response.interface';

@Component({
  selector: 'app-distributor-add',
  templateUrl: './distributor-add.component.html',
  styleUrls: ['./distributor-add.component.css']
})
export class DistributorAddComponent implements OnInit {

  form: FormGroup;
  allDistributors: Distribuidor[];

  constructor(private fb: FormBuilder, private dashService: DashboardmoduleService,
              public dialogRef: MatDialogRef<DistributorAddComponent>) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ({
      nombre: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      telefono: [null, Validators.compose([Validators.required])]
    });
   }


   addDistributor() {
     const distributorAdd: DistributorAddDto = this.form.value as DistributorAddDto;
     this.dashService.createDistributor(distributorAdd).subscribe(
      product => {
        this.dialogRef.close();
        }
      );
    }

}
