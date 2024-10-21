import { Component } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
})
export class AddProfileComponent {
  fileToUpload: File | null = null;
  mesaage: string = '';
  profileForm = this.formBuilder.group({
    name: [''],
    surname: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  onSubmit() {
    const data = {
      name: this.profileForm.value.name,
      surname: this.profileForm.value.surname,
      file: this.fileToUpload,
    };
    this.profileService.create(data).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.data) {
          var dataString = localStorage.getItem('data');
          var parsedData = dataString ? JSON.parse(dataString) : [];
          let parsedData2 = parsedData.concat([res.data]);
          localStorage.setItem('data', JSON.stringify(parsedData2));
        }
        if (res.message) {
          this.mesaage = res.message;
        } else {
          this.mesaage = 'There are an error in the server';
        }
      },
      error: (e: any) => console.error(e),
    });
    console.warn(this.profileForm.value);
  }

  onFileChanged(event: any) {
    this.fileToUpload = event.target.files.item(0);
  }
}
