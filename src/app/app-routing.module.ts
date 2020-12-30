import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LandingComponent } from './ui/main/landing/landing.component';

const routes: Routes = [
  {
    path: 'login',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./shared/shared.module').then((mod) => mod.SharedModule),
  },
  {
    path: '',
    component: LandingComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./ui/transaction/transaction.module').then(
            (mod) => mod.TransactionModule
          ),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./ui/category/category.module').then(
            (mod) => mod.CategoryModule
          ),
      },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
