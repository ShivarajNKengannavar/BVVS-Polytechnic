import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  activeCategory = 'all';
  lightboxItem: any = null;

  allItems = [
    { icon: '🏆', title: 'Tech-Utsav 2024',         category: 'technical', year: 2024, desc: 'National Level Technical Festival with 500+ participants from across Karnataka.', bg: 'linear-gradient(135deg,#1a2a4a,#0d1f35)', tall: false },
    { icon: '🥇', title: 'State Sports Meet',        category: 'sports',    year: 2024, desc: 'State Level Sports Meet hosted at BVVS campus — athletics, cricket, volleyball and more.', bg: 'linear-gradient(135deg,#1a3a2a,#0d2015)', tall: true },
    { icon: '🎭', title: 'Annual Cultural Fest',     category: 'cultural',  year: 2024, desc: 'Annual cultural festival featuring dance, drama, music and art exhibitions.', bg: 'linear-gradient(135deg,#3a1a2a,#200d15)', tall: false },
    { icon: '🤝', title: 'NSS Blood Donation Camp',  category: 'nss',       year: 2024, desc: 'Voluntary blood donation camp organised by the NSS unit — 200+ units donated.', bg: 'linear-gradient(135deg,#3a2a1a,#20150d)', tall: false },
    { icon: '🎓', title: 'Convocation 2024',         category: 'campus',    year: 2024, desc: 'Annual Convocation ceremony where 300+ students received their diplomas.', bg: 'linear-gradient(135deg,#2a1a3a,#150d20)', tall: true },
    { icon: '🔬', title: 'Science Exhibition',       category: 'technical', year: 2023, desc: 'Students showcase innovative projects addressing real-world engineering challenges.', bg: 'linear-gradient(135deg,#1a2a4a,#0d1f35)', tall: false },
    { icon: '🏅', title: 'Silver Jubilee Sports',    category: 'sports',    year: 2023, desc: 'Silver Jubilee Sports celebrations with inter-collegiate competitions.', bg: 'linear-gradient(135deg,#1a3a2a,#0d2015)', tall: false },
    { icon: '🌿', title: 'NSS Plantation Drive',     category: 'nss',       year: 2023, desc: '500 trees planted across Bagalkot district as part of NSS green initiative.', bg: 'linear-gradient(135deg,#1a3a1a,#0d200d)', tall: false },
    { icon: '💻', title: 'Smart India Hackathon',    category: 'technical', year: 2023, desc: 'BVVS team qualified for national rounds of Smart India Hackathon.', bg: 'linear-gradient(135deg,#1a2a4a,#0d1f35)', tall: true },
    { icon: '🎵', title: 'Freshers Day 2023',        category: 'cultural',  year: 2023, desc: 'Warm welcome event for new students with cultural performances and fun activities.', bg: 'linear-gradient(135deg,#3a1a2a,#200d15)', tall: false },
    { icon: '🏗️', title: 'Industry Visit 2024',     category: 'campus',    year: 2024, desc: 'Students visited JSW Steel plant and L&T facility for hands-on industry exposure.', bg: 'linear-gradient(135deg,#2a2a1a,#15150d)', tall: false },
    { icon: '🎖️', title: 'NCC Parade',              category: 'nss',       year: 2023, desc: 'Annual NCC parade and drill competition at BVVS campus.', bg: 'linear-gradient(135deg,#1a3a3a,#0d2020)', tall: false },
  ];

  filteredItems = [...this.allItems];

  galleryStats = [
    { num: '65+', label: 'Years of Events' },
    { num: '50+', label: 'Events Per Year' },
    { num: '500+', label: 'Students Participate' },
    { num: '12+', label: 'Categories' },
  ];

  setCategory(cat: string): void {
    this.activeCategory = cat;
    this.filteredItems = cat === 'all'
      ? [...this.allItems]
      : this.allItems.filter(i => i.category === cat);
  }

  openItem(item: any): void  { this.lightboxItem = item; }
  closeItem(): void          { this.lightboxItem = null; }
}
