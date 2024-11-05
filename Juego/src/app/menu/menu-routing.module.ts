import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuJuegoComponent } from './menu-juego/menu-juego.component';
import { ReglasComponent } from './reglas/reglas.component';

const routes: Routes = [
    { path: '', component: MenuJuegoComponent },
    {path:'reglas', component: ReglasComponent}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MenuRoutingModule { }