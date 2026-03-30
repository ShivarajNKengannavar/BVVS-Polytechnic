import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {
  externalLinks = [
    { icon: '🏛', label: 'DTE Karnataka',               desc: 'Directorate of Technical Education, Karnataka — official regulatory body.',          url: 'http://dte.kar.nic.in' },
    { icon: '📋', label: 'AICTE India',                  desc: 'All India Council for Technical Education — national regulatory authority.',          url: 'https://www.aicte-india.org/' },
    { icon: '🇮🇳', label: 'MHRD',                       desc: 'Ministry of Human Resource Development, Government of India.',                        url: 'https://mhrd.gov.in/' },
    { icon: '▶️', label: 'DTE Studio Channel Bengaluru', desc: 'DTE Karnataka\'s official YouTube channel for e-learning and webinars.',              url: 'https://www.youtube.com/c/DTEStudioChannelBengaluru' },
    { icon: '🎓', label: 'Swayam Gov',                   desc: 'Government of India\'s MOOC platform — free courses from IITs and IIMs.',           url: 'https://swayam.gov.in/' },
    { icon: '📚', label: 'National Digital Library',     desc: 'IIT Kharagpur — millions of free learning resources in all subjects.',               url: 'https://ndl.iitkgp.ac.in/' },
    { icon: '📖', label: 'PDF Drive',                    desc: 'Free access to millions of PDF books and reference materials.',                       url: 'https://www.pdfdrive.com/' },
    { icon: '🔗', label: 'Delnet',                       desc: 'Developing Library Network — inter-library loan and resource sharing across India.',  url: 'http://www.delnet.in/' }
  ];
}
