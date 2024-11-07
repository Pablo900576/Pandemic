import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores.component';
import { InformacionComponent } from './informacion/informacion.component';

const routes: Routes = [
    { path: 'menuInfo', component: InformacionComponent },  
    { path: 'autores', component: AutoresComponent },
    { path: '',  component: InformacionComponent } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MenuInformacionRoutingModule {

        
    }