import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly apiUrl = 'https://localhost:7196/api/auth';

    constructor(private http: HttpClient) {}

    login(data: { email: string; senha: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, data).pipe(
            tap((res: any) => {
                sessionStorage.setItem('token', res.token);
            })
        );
    }

    register(data: { nome: string; email: string; senha: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }
}