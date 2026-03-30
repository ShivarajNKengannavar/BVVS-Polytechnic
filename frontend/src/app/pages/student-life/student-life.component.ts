import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BvvsApiService } from '../../services/bvvs-api.service';

// ════════════════════════════════════════════════════════════════════
//  INTERFACES & TYPES
// ════════════════════════════════════════════════════════════════════

interface Committee {
  icon: string;
  title: string;
  description: string;
  doc_url?: string;
  docUrl?: string;
  label?: string;
}

interface Scholarship {
  icon: string;
  title: string;
  description: string;
  doc_url?: string;
  docUrl?: string;
  label?: string;
}

interface SportsItem {
  icon: string;
  title: string;
  desc: string;
}

interface Club {
  icon: string;
  title: string;
  desc: string;
  url?: string;
}

interface AlumniStat {
  num: string;
  label: string;
}

type TabType = 'committees' | 'scholarships' | 'sports' | 'clubs' | 'alumni';

// ════════════════════════════════════════════════════════════════════
//  COMPONENT
// ════════════════════════════════════════════════════════════════════

@Component({
  selector: 'app-student-life',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-life.component.html',
  styleUrls: ['./student-life.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentLifeComponent implements OnInit, OnDestroy {
  // ── State Management ─────────────────────────────────────────────
  activeTab: TabType = 'committees';
  private destroy$ = new Subject<void>();

  // ── Data Collections ────────────────────────────────────────────
  committees: Committee[] = [];
  scholarships: Scholarship[] = [];

  readonly sportsItems: SportsItem[] = [
    { icon: '🏏', title: 'Cricket', desc: 'Inter-collegiate and intra-college cricket tournament held annually.' },
    { icon: '⚽', title: 'Football', desc: 'Football ground and regular inter-departmental matches.' },
    { icon: '🏐', title: 'Volleyball', desc: 'Volleyball is played at state level with outstanding student representation.' },
    { icon: '🏸', title: 'Badminton', desc: 'Indoor court with regular practice sessions and tournaments.' },
    { icon: '🎾', title: 'Table Tennis', desc: 'Equipped indoor sports room with carrom, chess and TT tables.' },
    { icon: '🏃', title: 'Athletics', desc: 'Annual athletics meet with track and field events for all students.' },
  ];

  readonly clubs: Club[] = [
    { icon: '💡', title: 'Innovative Club',         desc: 'Encourages creative thinking and prototype development for real-world problems.',  url: null },
    { icon: '🚀', title: 'Entrepreneurship Cell',   desc: 'Mentors student startups, connects with investors and industry experts.',          url: 'http://nisp.bvvspolytech.com/' },
    { icon: '🔬', title: 'Science Club',            desc: 'Organises science exhibitions, project competitions and inter-college events.',     url: null },
    { icon: '📡', title: 'Electronics Club',        desc: 'Hands-on workshops on Arduino, Raspberry Pi, PCB design and robotics.',            url: null },
    { icon: '🖥️', title: 'Coding Club',            desc: 'Competitive programming, hackathons and software project development.',             url: null },
    { icon: '🎭', title: 'Cultural Club',           desc: 'Organises Freshers Day, Annual Cultural Fest and National Day programmes.',        url: null },
    { icon: '🤝', title: 'NSS Unit',               desc: 'Community service, blood donation camps, cleanliness drives and rural outreach.',   url: null },
    { icon: '🧘', title: 'Yoga Club',              desc: 'Daily yoga sessions, mandatory for all students — unique to BVVS Polytechnic.',     url: null },
  ];

  readonly alumniStats: AlumniStat[] = [
    { num: '65+', label: 'Years of Alumni' },
    { num: '10K+', label: 'Alumni Network' },
    { num: '100+', label: 'Annual Alumni Meet' },
    { num: '50+', label: 'Industry Partners' },
  ];

  // ── Loading & Error States ──────────────────────────────────────
  loading = false;
  loadingCommittees = false;
  loadingScholarships = false;
  errorCommittees = '';
  errorScholarships = '';

  constructor(private api: BvvsApiService) {}

  ngOnInit(): void {
    this.loadCommittees();
    this.loadScholarships();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Tab Navigation ────────────────────────────────────────────
  selectTab(tab: TabType): void {
    this.activeTab = tab;
  }

  // ── API Methods ───────────────────────────────────────────────
  private loadCommittees(): void {
    this.loadingCommittees = true;
    this.errorCommittees = '';
    
    this.api.getCommittees()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Committee[]) => {
          this.committees = data && data.length > 0 ? data : this.fallbackCommittees();
          this.loadingCommittees = false;
        },
        error: (err) => {
          console.warn('Failed to load committees:', err);
          this.committees = this.fallbackCommittees();
          this.errorCommittees = 'Using cached data. Unable to fetch latest updates.';
          this.loadingCommittees = false;
        }
      });
  }

  private loadScholarships(): void {
    this.loadingScholarships = true;
    this.errorScholarships = '';
    
    this.api.getScholarships()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Scholarship[]) => {
          this.scholarships = data && data.length > 0 ? data : this.fallbackScholarships();
          this.loadingScholarships = false;
        },
        error: (err) => {
          console.warn('Failed to load scholarships:', err);
          this.scholarships = this.fallbackScholarships();
          this.errorScholarships = 'Using cached data. Unable to fetch latest updates.';
          this.loadingScholarships = false;
        }
      });
  }

  // ── Fallback Data ────────────────────────────────────────────
  private fallbackCommittees(): Committee[] {
    return [
      { icon: '🤝', title: 'Alumni Executive Committee', description: 'Maintains the alumni network and organises annual meets.', doc_url: 'https://bvvspolytech.com/aluminiec.aspx', label: 'View EC' },
      { icon: '⚖',  title: 'ICC (Internal Complaints)',  description: 'Addresses workplace and student harassment grievances.', doc_url: 'https://bvvspolytech.com/downloads/21032023/Sexual%20Harassment%20Committee.docx', label: 'View Members' },
      { icon: '🏷',  title: 'SC/ST Committee',           description: 'Welfare committee for Scheduled Caste and Tribe students.', doc_url: 'https://bvvspolytech.com/downloads/21032023/SC%20ST%20Committee.docx', label: 'View Details' },
      { icon: '🛡',  title: 'Anti-Ragging Committee',   description: 'Ensures a ragging-free campus environment.', doc_url: 'https://bvvspolytech.com/downloads/21032023/Antiraging%20Committee.pdf', label: 'View Details' },
      { icon: '🏆', title: 'Award Committee',           description: 'Recognises outstanding students and faculty.', doc_url: 'https://bvvspolytech.com/downloads/21032023/Award%20Committee.docx', label: 'View Details' },
      { icon: '📣', title: 'Grievance Cell (Ombudsman)', description: 'Official ombudsman committee for student grievance resolution.', doc_url: 'https://bvvspolytech.com/downloads/21032023/OMBUDSMAN%20Committee.docx', label: 'View Committee' },
    ];
  }

  private fallbackScholarships(): Scholarship[] {
    return [
      { icon: '🎓', title: 'Government Scholarships',  description: 'SC/ST, OBC, Minority and EWS scholarships from Government of Karnataka.', doc_url: 'https://bvvspolytech.com/pdf/scholarship.pdf', label: 'View Details' },
      { icon: '💡', title: 'AICTE Pragati Scholarship', description: 'Scholarship for girl students in technical programmes.', doc_url: 'https://bvvspolytech.com/pdf/Notice%20AICTE%20PRAGATI%20%26%20SAKSHAM%20Scholarships%2020-21.pdf', label: 'View Notice' },
      { icon: '💡', title: 'AICTE Saksham Scholarship', description: 'Scholarship for differently-abled students.', doc_url: 'https://bvvspolytech.com/pdf/Notice%20AICTE%20PRAGATI%20%26%20SAKSHAM%20Scholarships%2020-21.pdf', label: 'View Notice' },
      { icon: '📊', title: 'Scholarship Disbursement',  description: 'Disbursement statement 2015-16 to 2017-18.', doc_url: 'https://bvvspolytech.com/pdf/Government%20Scholrship%202015-18-converted.pdf', label: 'View Document' },
    ];
  }
}
