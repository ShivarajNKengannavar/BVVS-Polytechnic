import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BvvsApiService } from '../../services/bvvs-api.service';

@Component({
  selector: 'app-examinations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.scss']
})
export class ExaminationsComponent implements OnInit {
  results: any[]   = [];
  rules: any[]     = [];
  circulars: any[] = [];

  certServices = [
    { icon: '📄', title: 'Original Certificate',      desc: 'Apply for your diploma certificate after all semesters and dues clearance.', url: 'https://bvvspolytech.com/exam.aspx' },
    { icon: '📋', title: 'Duplicate Certificate',     desc: 'Apply for duplicates in case of loss or damage to original documents.',     url: 'https://bvvspolytech.com/exam.aspx' },
    { icon: '🔄', title: 'Revaluation',               desc: 'Apply for revaluation or photocopy of answer scripts within time limit.',    url: 'https://bvvspolytech.com/exam.aspx' },
    { icon: '✏️',  title: 'Correction of Marks Card', desc: 'Corrections to name, date of birth or other details on marks cards.',       url: 'https://bvvspolytech.com/exam.aspx' },
    { icon: '💰', title: 'Exam Fee Structure',        desc: 'Fee structure for regular, backlog and lateral entry examinations.',          url: 'https://bvvspolytech.com/exam.aspx' },
    { icon: '🧘', title: 'Yoga Practical',            desc: 'Notification for Yoga practical examination — mandatory for all students.',  url: 'https://bvvspolytech.com/pdf/Exam%20Notification%20Addition.pdf' },
  ];

  fallbackResults = [
    { label: 'C-21 / C-25 Results', url: 'https://resultstest.digitalmis.com/', icon: '📊' },
    { label: 'C-15 / C-19 Results', url: 'https://results.bvvspolytech.com/',   icon: '📊' },
    { label: 'Community Results',   url: 'https://bvvspolytech.com/CommunityResult.aspx', icon: '📊' },
  ];

  fallbackRules = [
    { icon: '📋', title: 'C-21 Exam Rules',        description: 'Revised examination rules and guidelines for C-21 curriculum.',   docUrl: 'https://bvvspolytech.com/pdf/exam%20rules%20and%20guidelines-C-21-REVISED.docx', label: 'Download' },
    { icon: '📋', title: 'C-19 Exam Rules',        description: 'Examination rules and regulations for C-19 curriculum students.', docUrl: 'https://bvvspolytech.com/pdf/112169.pdf', label: 'Download' },
    { icon: '📄', title: 'Exam Circular May 2025', description: 'Official examination circular for May 2025 session.',             docUrl: 'https://bvvspolytech.com/pdf/exam_circular_may_25.pdf', label: 'Download' },
    { icon: '⏸',  title: 'Postponement Notice',   description: 'Examination postponement circular with revised schedule.',         docUrl: 'https://bvvspolytech.com/downloads/exampostpone.pdf', label: 'Download' },
  ];

  fallbackCirculars = [
    { icon: '📋', title: 'Exam Circular May 2025',       description: 'Latest exam circular for May 2025 batch.', docUrl: 'https://bvvspolytech.com/pdf/exam_circular_may_25.pdf', label: 'Download' },
    { icon: '⏸',  title: 'Postponement Notice Nov 2025', description: 'Postponement notice with revised dates.', docUrl: 'https://bvvspolytech.com/downloads/exampostpone.pdf', label: 'Download' },
    { icon: '🧘', title: 'Yoga Practical Notification',  description: 'Exam notification for Yoga practical paper.', docUrl: 'https://bvvspolytech.com/pdf/Exam%20Notification%20Addition.pdf', label: 'Download' },
    { icon: '🎓', title: 'AICTE Pragati Scholarship',    description: 'Scholarship notice for girl students 2020-21.', docUrl: 'https://bvvspolytech.com/pdf/Notice%20AICTE%20PRAGATI%20%26%20SAKSHAM%20Scholarships%2020-21.pdf', label: 'Download' },
  ];

  constructor(private api: BvvsApiService) {}

  ngOnInit(): void {
    this.results   = this.fallbackResults;
    this.rules     = this.fallbackRules;
    this.circulars = this.fallbackCirculars;
    this.api.getExamResults().subscribe({ next: d => { if (d.length) this.results = d; }, error: () => {} });
    this.api.getExamCirculars().subscribe({ next: d => { if (d.length) this.circulars = d; }, error: () => {} });
  }
}
