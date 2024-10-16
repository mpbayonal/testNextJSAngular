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
  profileForm = this.formBuilder.group({
    name: [''],
    surname: [''],
    file: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  onSubmit() {
    console.log(this.profileForm.value);
    const data = {
      name: this.profileForm.value.name,
      surname: this.profileForm.value.surname,
      file: this.profileForm.value.file,
    };
    this.profileService.create(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e: any) => console.error(e),
    });
    console.warn(this.profileForm.value);
  }

  detectFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files: FileList | null = input.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const reader: FileReader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.file.push(
            this.createItem({
              file,
              url: e.target?.result as string, // Base64 string for preview image
            })
          );
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
