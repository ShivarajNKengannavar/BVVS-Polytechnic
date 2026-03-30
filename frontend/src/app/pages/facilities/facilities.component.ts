import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent {
  facilities = [
    { icon: '🏠', title: 'Hostel Facilities',            description: 'Hygienic hostel facilities for both girls and boys with separate accommodation blocks, mess and round-the-clock security.' },
    { icon: '🌿', title: 'Green Campus',                  description: 'Lush green campus environment promoting a healthy and productive learning atmosphere for students and staff.' },
    { icon: '🏥', title: 'Medical Facilities',            description: 'All-time medical facilities with a campus health centre and tie-ups with nearby hospitals for emergency care.' },
    { icon: '💬', title: 'Student Counseling Centre',    description: 'Students\' guidance and counseling center providing academic, career and personal counseling by trained professionals.' },
    { icon: '👨‍🏫', title: 'Mentor System',              description: 'Effective mentor system where every student is assigned a faculty mentor to track academic progress and welfare.' },
    { icon: '💡', title: 'Innovative Club',               description: 'Dedicated innovation club encouraging students to develop creative solutions and entrepreneurial projects.' },
    { icon: '🗣️', title: 'Language Lab',                  description: 'Fully equipped language laboratory for improving English communication and soft skills among students.' },
    { icon: '📡', title: 'Continuing Education Cell',     description: 'Need-based programs through Continuing Education Cell under CIICP — bridging industry and academia.' },
    { icon: '🤝', title: 'Alumni & Parents Meet',         description: 'Regular alumni and parents meet at scheduled intervals to foster engagement and gather feedback for improvement.' },
    { icon: '🧘', title: 'NSS, NCC & Yoga Centre',       description: 'Active NSS, Youth Red Cross Wing, NCC and Yoga Centre — promoting social responsibility and physical wellness.' },
    { icon: '📘', title: 'Curriculum Development Cell',  description: 'Dedicated cell for continuous curriculum update and development aligned with industry requirements.' },
    { icon: '⚙️', title: 'STE & IEI Chapters',           description: 'Active chapters of Society for Technical Education (STE) and Institution of Engineers India (IEI) for professional development.' },
    { icon: '💻', title: 'MIS & Digital Campus',          description: 'Management Information System (MIS), e-Governance and fully digital campus for efficient administration.' },
    { icon: '📋', title: 'Strategic Planning Group',      description: 'Strategic Planning Group identifying and implementing need-based projects for overall institutional development since 1996.' },
    { icon: '🏫', title: 'State-of-Art Classrooms',       description: 'Modern classrooms equipped with projectors, smart boards and audio-visual aids for effective teaching.' },
    { icon: '🎭', title: 'Co-curricular Activities',      description: 'Rich co-curricular and extracurricular activities — cultural fests, sports meets, technical exhibitions and more.' },
    { icon: '🚀', title: 'Entrepreneurship Centre',       description: 'Dedicated entrepreneurship centre supporting student startups with mentorship, resources and networking.' },
    { icon: '🏭', title: 'Production Cum Training Centre', description: 'Unique Production Cum Training Centre in Mechanical Engineering for hands-on manufacturing and production experience. Only such centre in a Karnataka polytechnic.' },
    { icon: '🖥️', title: 'Spoken Tutorial Programs',      description: 'Spoken tutorial training programs and certificate courses under STP, IIT Bombay — free online learning certification.' }
  ];
}
