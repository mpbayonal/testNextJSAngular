import {
  afterNextRender,
  AfterViewInit,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
const ELEMENT_DATA: any[] = [
  {
    name: 'Hydrogen',
    surname: 1.0079,
    seniority: 'H',
    years: 'H',
    availability: 'H',
  },
  {
    name: 'Helium',
    surname: 4.0026,
    seniority: 'He',
    years: 'H',
    availability: 'H',
  },
];
@Component({
  selector: 'app-profiles-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfilesListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'surname',
    'seniority',
    'years',
    'availability',
  ];
  columnsToDisplay = this.displayedColumns.slice();
  recs = new MatTableDataSource([]);

  constructor() {
    var data = localStorage.getItem('data');
    if (data) {
      var dataString = localStorage.getItem('data');
      var parsedData = dataString ? JSON.parse(dataString) : [];
      this.recs = new MatTableDataSource(parsedData);
    } else {
      localStorage.setItem('data', JSON.stringify(ELEMENT_DATA));
      var dataString = localStorage.getItem('data');
      var parsedData = dataString ? JSON.parse(dataString) : [];
      this.recs = new MatTableDataSource(parsedData);
    }
  }
  ngAfterViewInit() {
    var data = localStorage.getItem('data');
    if (data) {
      var dataString = localStorage.getItem('data');
      var parsedData = dataString ? JSON.parse(dataString) : [];
      this.recs = new MatTableDataSource(parsedData);
    } else {
      localStorage.setItem('data', JSON.stringify(ELEMENT_DATA));
      var dataString = localStorage.getItem('data');
      var parsedData = dataString ? JSON.parse(dataString) : [];
      this.recs = new MatTableDataSource(parsedData);
    }
  }
}
