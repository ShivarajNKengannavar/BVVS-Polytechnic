import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BvvsApiService } from '../../services/bvvs-api.service';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  accreditation: any[] = [];
  eoaLetters: any[]    = [];
  finance: any[]       = [];

  constructor(private api: BvvsApiService) {}

  ngOnInit(): void {
    this.api.getAccreditation().subscribe(d => this.accreditation = d);
    this.api.getEoaLetters().subscribe(d => this.eoaLetters = d);
    this.api.getFinance().subscribe(d => this.finance = d);
  }
}
