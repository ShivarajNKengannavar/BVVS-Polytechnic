import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BvvsApiService } from '../../services/bvvs-api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  about: any = null;
  overview: any[] = [];
  entrepreneurship: any[] = [];

  constructor(private api: BvvsApiService) {}

  ngOnInit(): void {
    this.api.getAbout().subscribe(d => this.about = d);
    this.api.getAboutOverview().subscribe(d => this.overview = d);
    this.api.getEntrepreneurship().subscribe(d => this.entrepreneurship = d);
  }
}
