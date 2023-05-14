import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: '',
    data: { title: 'Login' },
    loadComponent: () =>
      import('./pages/loginpage/loginpage.component').then(
        (m) => m.LoginpageComponent,
      ),
  },
  {
    path: 'home',
    data: { title: 'Home' },
    loadComponent: () =>
      import('./pages/movies/homepage/homepage.component').then(
        (m) => m.HomepageComponent,
      ),
  }
]