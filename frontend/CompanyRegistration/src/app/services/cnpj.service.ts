import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CnpjService {
    private readonly apiUrl = 'https://localhost:7196/api/company';

    constructor(private http: HttpClient) {}

    getCnpjs(params?: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/list`, { params });
    }
    
    addCnpj(data: { cnpj: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }
}