import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent {
  payScaleDocs = [
    { title: '2018 Revised State Scale',      desc: 'Revised pay scale for Karnataka Polytechnic staff.',  url: 'https://bvvspolytech.com/downloads/2018%20Revised%20State%20Scale.pdf' },
    { title: 'AICTE Pay Scale for Poly 2011', desc: 'AICTE pay scale for polytechnic faculty — 2011.',      url: 'https://bvvspolytech.com/downloads/AICTE%20PAY%20SCALE%20FOR%20POLY%202011.pdf' },
    { title: 'AICTE 7th Pay Scale 2018',      desc: '7th Pay Commission AICTE pay scale notification.',     url: 'https://bvvspolytech.com/downloads/21032023/AICTE%207th%20Pay%20Scale%202018.pdf' },
    { title: 'C&R Rules 2007',                desc: 'Cadre and Recruitment Rules 2007.',                    url: 'https://bvvspolytech.com/downloads/C%26R%20Rules%202007.pdf' }
  ];

  auditDocs = [
    { title: 'Audit Report 2021–22', url: 'https://bvvspolytech.com/pdf/audit/Audit%20Report%20for%2021-22.pdf' },
    { title: 'Audit Report 2020–21', url: 'https://bvvspolytech.com/pdf/audit/2020-21%20audit%20report.pdf' },
    { title: 'Audit Report 2017–18', url: 'https://bvvspolytech.com/pdf/audit/2017-18%20audit%20report.pdf' },
    { title: 'Audit Report 2016–17', url: 'https://bvvspolytech.com/pdf/audit/2016-17%20audit%20report.pdf' },
    { title: 'Audit Report 2015–16', url: 'https://bvvspolytech.com/pdf/audit/2015-16%20audit%20report.pdf' }
  ];

  budgetDocs = [
    { title: 'Budget 2019–20', url: 'https://bvvspolytech.com/pdf/budget/budget%2019-20.pdf' },
    { title: 'Budget 2018–19', url: 'https://bvvspolytech.com/pdf/budget/budget%2018-19.pdf' },
    { title: 'Budget 2017–18', url: 'https://bvvspolytech.com/pdf/budget/budget%2017-18.pdf' },
    { title: 'Budget 2016–17', url: 'https://bvvspolytech.com/pdf/budget/budget%2016-17.pdf' }
  ];

  salaryDocs = [
    { title: 'Salary Statement 2021–22', url: 'https://bvvspolytech.com/pdf/consolidated/Consolidated%20Salary%20Statement%202021-22.pdf' },
    { title: 'Salary Statement 2020–21', url: 'https://bvvspolytech.com/pdf/consolidated/Consolidated%20Salary%20Statement%202020-21.pdf' },
    { title: 'Salary Statement 2019–20', url: 'https://bvvspolytech.com/pdf/consolidated/Consolidated%20Salary%20Statement%202019-20.pdf' },
    { title: 'Salary Statement 2018–19', url: 'https://bvvspolytech.com/pdf/consolidated/2018-19%20Consolidated%20Salary%20Statement.pdf' },
    { title: 'Salary Statement 2017–18', url: 'https://bvvspolytech.com/pdf/consolidated/2017-18%20Consolidated%20Salary%20Statement.pdf' },
    { title: 'Salary Statement 2016–17', url: 'https://bvvspolytech.com/pdf/consolidated/2016-17%20consolidated%20salary%20Statement.pdf' }
  ];
}
