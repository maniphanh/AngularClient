import { Component, signal, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {  
  isLoading = signal(false);

  constructor(
    private oidcSecurityService: OidcSecurityService, 
    private http: HttpClient) {      
  }

  ngOnInit() {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      if (isAuthenticated) {
        this.getData();
      }
    });
  }

  getData() {
    this.isLoading.set(true);
    this.oidcSecurityService.getAccessToken().subscribe((token: any) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http
        .get<any>('yourApiGatewayBaseUrl/dev/document', { headers })
        .pipe(
          map((response: any) => {
            console.log('response: ', response);    
            return {};
          }),
          finalize(() => this.isLoading.set(false))
        )
        .subscribe((mappedobj : any) => {
          // set your local variables here
        });
    });
  }
}
