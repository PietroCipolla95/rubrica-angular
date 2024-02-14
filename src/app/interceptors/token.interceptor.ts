import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  /* const token = localStorage.getItem('token')

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) */

  console.log('ciao');

  return next(req);
};
