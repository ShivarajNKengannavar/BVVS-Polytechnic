import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accreditation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.scss']
})
export class AccreditationComponent {
  nbaItems = [
    { period: 'From 2023 To 2026',              description: 'Current NBA accreditation valid from 2023 to 2026 covering eligible Diploma programmes at BVVS Polytechnic.',         docUrl: 'https://bvvspolytech.com/pdf/Accreditation23-26_240129_105843.pdf', label: 'View Certificate' },
    { period: 'From 30-6-2021 To 30-6-2023',   description: 'Previous NBA accreditation for the period 30th June 2021 to 30th June 2023.',                                         docUrl: 'https://bvvspolytech.com/pdf/36188.pdf',                             label: 'View Certificate' },
    { period: 'From 28/06/2007 To 28/06/2010', description: 'NBA accreditation letter for Electronics & Communication Engineering from June 2007 to June 2010.',                  docUrl: 'https://bvvspolytech.com/pdf/NBA%20E_C%20letter.doc',                label: 'Download Document' },
    { period: 'From 16/03/2007 To 16/03/2010', description: 'Original NBA accreditation letters for four courses from March 2007 to March 2010 — the first NBA accreditation.',    docUrl: 'https://bvvspolytech.com/pdf/NBA%20Letter-4%20Courses.doc',          label: 'Download Document' }
  ];

  eoaLetters = [
    { year: '2024–25', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%20Report%202024-25.PDF' },
    { year: '2022–23', url: 'https://bvvspolytech.com/pdf/AICTE/EOA-Report_2022-23.PDF' },
    { year: '2021–22', url: 'https://bvvspolytech.com/pdf/AICTE/EOA_Report_2021-22.PDF' },
    { year: '2020–21', url: 'https://bvvspolytech.com/pdf/AICTE/EOA_Report_2020-21.PDF' },
    { year: '2019–20', url: 'https://bvvspolytech.com/pdf/AICTE/EOA_Report_2019-20.pdf' },
    { year: '2018–19', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2018-19.PDF' },
    { year: '2017–18', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2017-18.pdf' },
    { year: '2016–17', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2016-17.PDF' },
    { year: '2015–16', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2015-16.pdf' },
    { year: '2014–15', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2014-15.PDF' },
    { year: '2013–14', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2013-14.PDF' },
    { year: '2012–13', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2012-13.pdf' },
    { year: '2011–12', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2011-12.pdf' },
    { year: '2010–11', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2010-11.pdf' },
    { year: '2009–10', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2009-10.pdf' },
    { year: '2008–09', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2008-09.pdf' },
    { year: '2007–08', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2007-08.pdf' },
    { year: '2004–07', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2004-07.pdf' },
    { year: '2003–04', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2003-04%20DTE%20LETTER.pdf' },
    { year: '1993–2003', url: 'https://bvvspolytech.com/pdf/AICTE/EOA%2093-03%20(1).pdf' }
  ];
}
