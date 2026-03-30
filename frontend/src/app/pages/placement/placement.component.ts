import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BvvsApiService } from '../../services/bvvs-api.service';

@Component({
  selector: 'app-placement',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss']
})
export class PlacementComponent implements OnInit {
  placement: any = null;

  constructor(private api: BvvsApiService) {}

  ngOnInit(): void {
    this.api.getPlacement().subscribe(d => this.placement = d);
  }
}
