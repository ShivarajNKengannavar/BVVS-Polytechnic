import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BvvsApiService } from '../../../services/bvvs-api.service';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  dept: any = null;

  constructor(
    private route: ActivatedRoute,
    private api: BvvsApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dept = null;
      this.api.getDepartment(params['id']).subscribe(d => this.dept = d);
    });
  }
}
