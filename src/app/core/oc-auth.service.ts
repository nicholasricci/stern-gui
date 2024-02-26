import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OcAuthService {
  http = inject(HttpClient)
  userLoggedIn = signal(false)

  isUserLoggedIn() {
    return this.http.get('/api/oc/current-project')
      .subscribe({
        next: (message) => {
          this.userLoggedIn.set(true)
        },
        error: (error) => {
          console.log('error: ', error)
          this.userLoggedIn.set(false)
        }
      })
  }

  login(email: string, password: string, server: string) {
    this.http.post('/api/oc/login', {email, password, server})
      .subscribe({
        next: (message) => {
          this.userLoggedIn.set(true)
        },
        error: (error) => {
          console.log('error: ', error)
          this.userLoggedIn.set(false)
        }
      })
  }

  setUserLoggedIn(value: boolean) {
    this.userLoggedIn.set(value)
  }
}
