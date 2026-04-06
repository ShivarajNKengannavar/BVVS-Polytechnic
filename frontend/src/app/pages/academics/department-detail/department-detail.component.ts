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
  readonly fallbackImage = 'assets/images/ENTRANCE.png';
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

  resolveImageUrl(url: string | null | undefined): string {
    if (!url) return this.fallbackImage;
    const normalized = url.trim();
    if (!normalized) return this.fallbackImage;
    return normalized.startsWith('http://') ? `https://${normalized.slice(7)}` : normalized;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (!img) return;
    if (img.dataset.fallbackApplied === '1') return;
    img.dataset.fallbackApplied = '1';
    img.src = this.fallbackImage;
  }
}
