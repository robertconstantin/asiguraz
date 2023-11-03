import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
// model
import { Sofer } from 'src/app/core/models/api/polita/sofer.model';
// service

@Component({
  selector: 'app-sofer',
  templateUrl: './sofer.component.html',
  styleUrls: ['./sofer.component.scss']
})
export class SoferComponent implements OnInit, OnDestroy {

  @Input() sofer: Sofer;

  // form
  public formSofer: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.initForm();

    // subscribe to form changes
    this.formSofer.valueChanges.subscribe(data => {
      this.parseForm(data);
    });
  }

  private initForm() {
    // create form
    this.formSofer = this.formBuilder.group({
      ciNumar: new FormControl('', Validators.required),
      ciSeria: new FormControl('', Validators.required),
      cnp: new FormControl('', Validators.required),
      nume: new FormControl('', Validators.required),
      prenume: new FormControl('', Validators.required),
      dataPermisConducere: new FormControl('', Validators.required),
    });
  }

  private parseForm(data: any) {
    // conducator Auto
    this.sofer.ciNumar = data.ciNumar;
    this.sofer.ciSeria = data.ciSeria;
    this.sofer.cnp = data.cnp;
    this.sofer.nume = data.nume;
    this.sofer.prenume = data.prenume;
  }

  ngOnInit() {
    this.initData();
  }

  private initData() {
    console.log(this.sofer, 'sofer');
    if (this.sofer) {
      this.formSofer.patchValue(this.sofer);
    }
  }

  ngOnDestroy() {
  }

}
