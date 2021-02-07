import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {MainNavigationComponent} from './main-navigation/main-navigation.component';
import {TransactionComponent} from './transaction/transaction.component';

const routes: Routes = [
  {
    path: 'login',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: '',
    component: MainNavigationComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./transaction/transaction.module').then(
            (mod) => mod.TransactionModule
          ),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./category/category.module').then(
            (mod) => mod.CategoryModule
          ),
      },
    ],
  },

  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
