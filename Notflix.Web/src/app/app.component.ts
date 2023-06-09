import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private _router = inject(Router);
  title = 'Notflix';

  routes: Array<{ path: string; title: string }> = [];

  private isProperPage(
    route: Route,
  ): route is Route & { data: { title: string } } {
    return route.path !== '**' && !!route.data && !!route.data['title'];
  }

  ngOnInit() {
    for (const route of this._router.config) {
      if (!this.isProperPage(route)) continue;

      this.routes.push({
        path: `/${route.path}`,
        title: route.data.title,
      });
    }
  }
}
