import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglasComponent } from './reglas/reglas.component';
import { AutoresComponent } from './autores/autores.component';

const routes: Routes = [
    {path:'reglas', component: ReglasComponent},
    {path:'autores', component: AutoresComponent},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MenuInformacionRoutingModule { }