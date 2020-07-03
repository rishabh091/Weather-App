import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompHomeComponent } from './comp-home/comp-home.component';


const routes: Routes = [
  {
    path: '',
    component: CompHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
