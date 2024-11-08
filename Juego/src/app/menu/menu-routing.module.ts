import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuJuegoComponent } from './menu-juego/menu-juego.component';

const routes: Routes = [
    { path: '', component: MenuJuegoComponent },
    {path:'menu', component: MenuJuegoComponent},
    {path:'menuInfo', loadChildren: () => import('./menu-informacion/menu-informacion.module').then(m => m.MenuInformacionModule) },
    {path:'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MenuRoutingModule { }