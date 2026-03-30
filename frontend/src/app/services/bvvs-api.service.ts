import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:3001/api';

@Injectable({ providedIn: 'root' })
export class BvvsApiService {
  constructor(private http: HttpClient) {}

  // HOME
  getStats()           : Observable<any> { return this.http.get(`${API}/home/stats`); }
  getNotices()         : Observable<any> { return this.http.get(`${API}/home/notices`); }
  getAchievements()    : Observable<any> { return this.http.get(`${API}/home/achievements`); }
  getSkillProgrammes() : Observable<any> { return this.http.get(`${API}/home/skill-programmes`); }

  // ABOUT
  getAbout()           : Observable<any>   { return this.http.get(`${API}/about`); }
  getAboutOverview()   : Observable<any>   { return this.http.get(`${API}/about/overview`); }
  getEntrepreneurship(): Observable<any>   { return this.http.get(`${API}/about/entrepreneurship`); }

  // ACADEMICS
  getDepartments()     : Observable<any>   { return this.http.get(`${API}/academics/departments`); }
  getDepartment(id: string): Observable<any> { return this.http.get(`${API}/academics/departments/${id}`); }

  // EXAMINATIONS
  getExaminations()   : Observable<any>   { return this.http.get(`${API}/examinations`); }
  getExamResults()    : Observable<any>   { return this.http.get(`${API}/examinations/results`); }
  getExamCirculars()  : Observable<any>   { return this.http.get(`${API}/examinations/circulars`); }
  getExamRules()      : Observable<any>   { return this.http.get(`${API}/examinations/rules`); }

  // STUDENT LIFE
  getStudentLife()    : Observable<any>   { return this.http.get(`${API}/student-life`); }
  getResources()      : Observable<any>   { return this.http.get(`${API}/student-life/resources`); }
  getCommittees()     : Observable<any>   { return this.http.get(`${API}/student-life/committees`); }
  getScholarships()   : Observable<any>   { return this.http.get(`${API}/student-life/scholarships`); }

  // ADMINISTRATION
  getAdministration() : Observable<any>   { return this.http.get(`${API}/administration`); }
  getAccreditation()  : Observable<any>   { return this.http.get(`${API}/administration/accreditation`); }
  getEoaLetters()     : Observable<any>   { return this.http.get(`${API}/administration/eoa`); }
  getFinance()        : Observable<any>   { return this.http.get(`${API}/administration/finance`); }

  // ADMISSION
  getAdmission(): Observable<any> {
    return this.http.get<any>(`${API}/admission`);
  }

  // PLACEMENT
  getPlacement()      : Observable<any>   { return this.http.get(`${API}/placement`); }
  getCompanies()      : Observable<any>   { return this.http.get(`${API}/placement/companies`); }
}
