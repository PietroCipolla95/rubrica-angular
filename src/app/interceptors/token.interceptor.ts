import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService)
  const route = inject(Router)
  const token = localStorage.getItem('token')

  if (token) {

    let decodedToken: any = jwtDecode(token)
    const isExpired = decodedToken.exp < Date.now() / 1000

    if (isExpired) {

      console.log('token expired');

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      route.navigate(['/login'])

    } else {

      console.log('token not expired');

      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })

      return next(authRequest)

    }

  } else {

    console.log('not logged');

    route.navigate(['/login'])

  }

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(authRequest)


};
