import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "./shared/auth/guards/auth.guard";

const routes: Routes = [{
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
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./ui/main/main.module').then((mod) => mod.MainModule),
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
