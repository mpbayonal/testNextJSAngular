import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfilesListComponent implements OnInit {
  profiles?: Profile[];
  currentProfile: Profile = {};
  currentIndex = -1;
  title = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.retrieveProfiles();
  }

  retrieveProfiles(): void {
    this.profileService.getAll().subscribe({
      next: (data) => {
        this.profiles = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
