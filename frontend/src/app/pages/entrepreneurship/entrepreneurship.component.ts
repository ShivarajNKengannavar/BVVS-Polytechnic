import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entrepreneurship',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './entrepreneurship.component.html',
  styleUrls: ['./entrepreneurship.component.scss']
})
export class EntrepreneurshipComponent {
  cells = [
    { icon: '🚀', title: 'IIC — Institution Innovation Council', description: 'Institution Innovation Council fosters innovation, creativity and entrepreneurship. Organises hackathons, ideathons and startup challenges.', docUrl: 'https://bvvspolytech.com/pdf/1.%20IIC.pdf' },
    { icon: '🧑‍💼', title: 'PD & Career Resource Cell', description: 'Personality Development and Career Resource Cell provides training in communication, soft skills, resume building and interview preparation.', docUrl: 'https://bvvspolytech.com/pdf/2.%20PD%20and%20CR%20cell.pdf' },
    { icon: '🌱', title: 'Startup Cell', description: 'Dedicated startup ecosystem providing mentorship, seed funding guidance, business model validation and industry connections for aspiring entrepreneurs.', docUrl: 'https://bvvspolytech.com/pdf/3.%20Startup%20cell.pdf' },
    { icon: '🏭', title: 'MSME Cell', description: 'Connects students and faculty with Micro, Small and Medium Enterprise opportunities, government schemes, MSME registration and funding avenues.', docUrl: 'https://bvvspolytech.com/pdf/4.%20MSME%20Cell.pdf' },
    { icon: '🏢', title: 'CSDE', description: 'Centre for Skill Development and Entrepreneurship — bridges vocational training with enterprise creation aligned with industry needs.', docUrl: 'https://bvvspolytech.com/pdf/5.%20CSDE.pdf' },
    { icon: '⚖', title: 'IPR Cell', description: 'Guides students and faculty on patents, trademarks and copyrights. Assists in filing patent applications for student innovations.', docUrl: 'https://bvvspolytech.com/pdf/6.%20IPR%20cell.pdf' },
    { icon: '📜', title: 'Legal Cell', description: 'Legal advisory support for startup formation, contracts, compliance and regulatory matters for student entrepreneurs.', docUrl: 'https://bvvspolytech.com/pdf/7.%20Legal%20Cell.pdf' },
    { icon: '🎓', title: 'Students Club', description: 'Entrepreneurship student club — networking events, guest lectures, competition participation and peer learning for aspiring entrepreneurs.', docUrl: 'https://bvvspolytech.com/pdf/9.%20Students%20Culb.pdf' },
    { icon: '📱', title: 'Social Media Cell', description: "Manages institutional digital presence and trains students in digital marketing, content creation and online brand building.", docUrl: 'https://bvvspolytech.com/pdf/10.%20SOCIAL%20MEDIA%20CELL.pdf' },
    { icon: '💡', title: 'Innovation & Startup Policy (NISP)', description: 'National Innovation and Startup Policy implementation — establishes mechanisms to promote innovation, IP creation and startup ecosystem.', docUrl: 'https://bvvspolytech.com/pdf/11.%20Innovation%20and%20Startup%20Policy%20(NISP).pdf' }
  ];
}
