import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'main',pathMatch:'full'},
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.BAuthModule),
  },
  {
    path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
