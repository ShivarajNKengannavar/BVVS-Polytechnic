import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent {
  constructor(private router: Router) {}
  go(path: string) { this.router.navigate(['/' + path]); }

  depts = [
    { id: 'civil',           icon: '🏗',  name: 'Civil Engineering',                seats: 60 },
    { id: 'electrical',      icon: '⚡',  name: 'Electrical & Electronics',          seats: 60 },
    { id: 'mechanical',      icon: '⚙️',  name: 'Mechanical Engineering',            seats: 60 },
    { id: 'automobile',      icon: '🚗',  name: 'Automobile Engineering',            seats: 30 },
    { id: 'electronics',     icon: '📡',  name: 'Electronics & Communication',       seats: 30 },
    { id: 'cse',             icon: '💻',  name: 'Computer Science & Engineering',    seats: 60 },
    { id: 'instrumentation', icon: '🎛',  name: 'Instrumentation Technology',        seats: 30 },
    { id: 'ise',             icon: '💡',  name: 'Information Science & Engineering', seats: 30 },
    { id: 'commercial',      icon: '📊',  name: 'Commercial Practice',               seats: 60 }
  ];

  eligibility = [
    { icon: '🎓', title: '10th Pass (SSLC)',          desc: 'Passed Karnataka SSLC or equivalent examination from a recognised board.' },
    { icon: '📊', title: 'Minimum 35% Marks',         desc: 'Minimum aggregate of 35% in 10th standard for general category students.' },
    { icon: '📅', title: 'Age — No Upper Limit',      desc: 'No upper age limit for diploma admission. Minimum age: 14 years as of July 1st.' },
    { icon: '🌐', title: 'Karnataka Domicile',        desc: 'Preference to Karnataka state students. 15% seats open to other state candidates.' },
  ];

  lateralEntry = [
    { icon: '🔁', title: 'ITI Holders → 2nd Year',   desc: 'ITI certificate holders in relevant trades can directly join 2nd year (3rd semester) diploma.' },
    { icon: '📐', title: '10+2 Science → 2nd Year',  desc: 'Students who passed PUC/10+2 with Physics, Chemistry and Maths can join 2nd year.' },
    { icon: '📋', title: 'Karnataka LEET Exam',       desc: 'Admission via Karnataka Lateral Entry Entrance Test (LEET) conducted by DEd.' },
    { icon: '💺', title: '10% Supernumerary Seats',  desc: 'Lateral entry fills 10% supernumerary seats above sanctioned intake.' },
  ];

  procedure = [
    { step: '01', title: 'Online Registration',    desc: 'Register at the Karnataka DCET portal or apply directly to BVVS Polytechnic.' },
    { step: '02', title: 'Merit List Publication', desc: 'Merit list based on SSLC marks. Category-wise lists on notice board and website.' },
    { step: '03', title: 'Document Verification', desc: 'Attend counselling with originals: SSLC marks, TC, caste cert, Aadhaar and photos.' },
    { step: '04', title: 'Seat Allotment',         desc: 'Seat allotted based on merit rank, preference and availability. Fee payment confirms seat.' },
    { step: '05', title: 'Fee Payment',            desc: 'Pay tuition, development and other charges per government-approved fee structure.' },
    { step: '06', title: 'Enrollment',             desc: 'Fill enrollment form, submit to office with all documents to complete admission.' },
  ];

  importantDocs = [
    { icon: '📄', title: 'SSLC Marks Card',            desc: 'Original + 2 photocopies' },
    { icon: '📋', title: 'Transfer Certificate (TC)',   desc: 'Original TC from previous school' },
    { icon: '🏷',  title: 'Caste Certificate',          desc: 'For SC/ST/OBC categories (if applicable)' },
    { icon: '🪪',  title: 'Aadhaar Card',              desc: 'Original + photocopy' },
    { icon: '📸', title: 'Passport Size Photos',       desc: '6 recent colour passport photographs' },
    { icon: '🏠', title: 'Domicile / Residence Proof', desc: 'Karnataka resident certificate or ration card' },
    { icon: '💰', title: 'Income Certificate',         desc: 'For scholarship and fee waiver applications' },
    { icon: '📊', title: 'Migration Certificate',      desc: 'Required for students from outside Karnataka' },
  ];

  
}
