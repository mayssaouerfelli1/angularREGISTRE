import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot,UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import {Injectable} from '@angular/core'
import{Observable} from 'rxjs'

@Injectable({
 providedIn: 'root'
})

export class ChansonGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isAdmin())
      return true;
    else {
      this.router.navigate(['app-forbidden']);
      return false;
    }
  }
}