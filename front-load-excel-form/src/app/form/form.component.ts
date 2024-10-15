import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [
    ReactiveFormsModule,
    RxReactiveFormsModule,
    CommonModule,
    RouterLink,
    TranslateModule,
    NgIf,
  ],
})
export class FormComponent  {
  formMode = 'New';
  sub: any;
  id: any;
  entryForm!: FormGroup;
  error: string | undefined;
  position!: Position;
  isAddNew: boolean = false;
  submitted = false;

  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {
    this.createForm();
  }

  // Handle Create button click
  onCreate() {
    this.create(this.entryForm.value);
    log.debug('OnInsert: ', this.entryForm.value);
    log.debug('OnInsert: ', this.entryForm.get('positionNumber')!.value);
  }

  create(data: any): void {
    this.apiHttpService
      .post(this.apiEndpointsService.postPositionsEndpoint(), data)
      .subscribe((resp: any) => {
        this.id = resp.data; //guid return in data
        this.showToaster('Great job!', 'Data is inserted');
        this.entryForm.reset();
      });
  }

  // reactive form
  private createForm() {
    this.entryForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  // call modal service
  showToaster(title: string, message: string) {
    this.toastService.show(title, message, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.entryForm.controls;
  }
}
