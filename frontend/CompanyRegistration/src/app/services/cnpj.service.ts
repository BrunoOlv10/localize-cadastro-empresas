import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CnpjService {
    private readonly apiUrl = 'https://localhost:7196/api/company';

    private cnpjAddedSource = new Subject<void>();
    cnpjAdded$ = this.cnpjAddedSource.asObservable();

    constructor(private http: HttpClient) {}

    getCnpjs(params?: any): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/list`, { params, headers });
    }
    
    addCnpj(data: { cnpj: string }): Observable<any> {
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.apiUrl}/register`, data, { headers });
    }

    notifyCnpjAdded() {
        this.cnpjAddedSource.next();
    }
}