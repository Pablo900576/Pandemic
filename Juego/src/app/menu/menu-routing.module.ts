import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuJuegoComponent } from './menu-juego/menu-juego.component';
import { ReglasComponent } from './menu-informacion/reglas/reglas.component';
import { AutoresComponent } from './menu-informacion/autores/autores.component';

const routes: Routes = [
    { path: '', component: MenuJuegoComponent },
    {path:'reglas', component: ReglasComponent},
    {path:'regla1', component: AutoresComponent},
    {path:'menu', component: MenuJuegoComponent}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MenuRoutingModule { }