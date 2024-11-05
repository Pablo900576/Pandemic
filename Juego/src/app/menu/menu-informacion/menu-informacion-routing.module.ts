import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores.component';
import { InformacionComponent } from './informacion/informacion.component';

const routes: Routes = [
    {path:'', component: InformacionComponent},
    {path:'reglas', component: InformacionComponent},
    {path:'autores', component: AutoresComponent},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MenuInformacionRoutingModule { }