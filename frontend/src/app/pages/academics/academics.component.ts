import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BvvsApiService } from '../../services/bvvs-api.service';

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})
export class AcademicsComponent implements OnInit {
  departments: any[] = [];
  skillProgrammes: any[] = [];

  constructor(private api: BvvsApiService) {}

  ngOnInit(): void {
    this.api.getDepartments().subscribe(d => this.departments = d);
    this.api.getSkillProgrammes().subscribe(d => this.skillProgrammes = d);
  }
}
