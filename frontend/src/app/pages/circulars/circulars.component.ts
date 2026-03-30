import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BvvsApiService } from '../../services/bvvs-api.service';

@Component({
  selector: 'app-circulars',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './circulars.component.html',
  styleUrls: ['./circulars.component.scss']
})
export class CircularsComponent implements OnInit {
  private readonly recentLimit = 5;

  recentCirculars = [
    { icon: '📢', title: 'Exam Circular May 2025',          desc: 'Official examination circular for May 2025 semester examinations — schedule, venue and guidelines.',                    url: 'https://bvvspolytech.com/pdf/exam_circular_may_25.pdf',                                              label: 'Download' },
    { icon: '📝', title: 'Exam Notice May 2025',             desc: 'Official exam notice for May 2025 semester examinations.',                                                              url: 'https://bvvspolytech.com/pdf/exam_Notice_may_25.jpeg',                                               label: 'View Notice' },
    { icon: '⏸',  title: 'Exam Postponement Notice Nov 2025', desc: 'Nov-2025 Exam Postponement Circular — revised dates and updated examination schedule.',                              url: 'https://bvvspolytech.com/downloads/exampostpone.pdf',                                                label: 'Download' },
    { icon: '📝', title: 'Exam Form Notice Nov 2025',        desc: 'Examination form submission notice for November 2025 — fees and deadlines.',                                          url: 'https://bvvspolytech.com/downloads/examformnoticenov2025.jpg',                                       label: 'View Notice' },
    { icon: '📋', title: 'Notice Exam Nov 2024',             desc: 'Official exam notice for November 2024 semester examinations.',                                                        url: 'https://bvvspolytech.com/pdf/Nov-2024%20Exam%20Notice.pdf',                                          label: 'Download' }
  ];

  previousNotices = [
    { icon: '📋', title: 'Autonomous Exam Guidelines September 2020', desc: 'Guidelines for autonomous examinations conducted in September 2020.',                                     url: 'https://bvvspolytech.com/pdf/AUTONOMOUS%20Exam%20Guidelines%20September%202020.pdf',                label: 'Download' },
    { icon: '📋', title: 'Photocopy &amp; Revaluation Notice',       desc: 'Official notice for photocopy of answer scripts and revaluation application procedure.',                   url: 'https://bvvspolytech.com/pdf/photocopy%20and%20revaluation%20notice.pdf',                           label: 'Download' },
    { icon: '📋', title: 'Admission Extension Notice',                desc: 'Notice regarding extension of admission dates for diploma programmes.',                                   url: 'https://bvvspolytech.com/pdf/adm%20extension.pdf',                                                   label: 'Download' },
    { icon: '💡', title: 'AICTE Pragati &amp; Saksham Scholarship',  desc: 'AICTE scholarship notices for Pragati (girl students) and Saksham (differently-abled) for 2020-21.',      url: 'https://bvvspolytech.com/pdf/Notice%20AICTE%20PRAGATI%20%26%20SAKSHAM%20Scholarships%2020-21.pdf', label: 'Download' },
    { icon: '📋', title: 'General Notice 1',                          desc: 'Official general notice regarding examination and academic matters.',                                     url: 'https://bvvspolytech.com/pdf/Notice.pdf',                                                            label: 'Download' },
    { icon: '📋', title: 'General Notice 3',                          desc: 'Scanned official notice — July 2020.',                                                                    url: 'https://bvvspolytech.com/pdf/Scan%203%20Jul%202020.pdf',                                             label: 'Download' }
  ];

  constructor(private api: BvvsApiService) {}

  ngOnInit(): void {
    this.api.getExamCirculars().subscribe({
      next: (items) => {
        if (items?.length) {
          const mapped = items.map((c: any) => ({
            icon: c.icon || '📢',
            title: c.title,
            desc: c.description || 'Official circular from BVVS Polytechnic.',
            url: c.docUrl || c.url,
            label: c.label || 'Download'
          }));

          this.recentCirculars = mapped.slice(0, this.recentLimit);
          this.previousNotices = mapped.slice(this.recentLimit);
        }
      },
      error: () => {}
    });
  }
}
