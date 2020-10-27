import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoListComponent } from './curso/curso-list/curso-list.component';

const routes: Routes = [
    {
        // Nomes de rota no angular(path) nao comecam com uma barra (/)
        path: 'curso',
        component: CursoListComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
