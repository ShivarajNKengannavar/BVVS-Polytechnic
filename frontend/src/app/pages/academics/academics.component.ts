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
  readonly fallbackImage = 'assets/images/ENTRANCE.png';
  departments: any[] = [];
  skillProgrammes: any[] = [];

  constructor(private api: BvvsApiService) {}

  ngOnInit(): void {
    this.api.getDepartments().subscribe(d => this.departments = d);
    this.api.getSkillProgrammes().subscribe(d => this.skillProgrammes = d);
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
