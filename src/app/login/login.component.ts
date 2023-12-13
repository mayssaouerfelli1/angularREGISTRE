import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  user = new User();
  err: number = 0;
  message: string = "Login ou mot de passe erronés.";

  constructor(private authService: AuthService, private router: Router) { }

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  private handleError(err: any) {
    this.err = 1;
    if (err && err.error && err.error.errorCause === 'disabled') {
      this.message = "Utilisateur désactivé";
    } else {
      // Gérer d'autres scénarios d'erreur ici si nécessaire
      console.error("Une erreur s'est produite :", err);
    }
  }
}
