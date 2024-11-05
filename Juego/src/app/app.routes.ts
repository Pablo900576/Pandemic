import { Routes } from '@angular/router';
import { AutoresComponent } from './menu/autores/autores.component';
import { ReglasComponent } from './menu/reglas/reglas.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
];
