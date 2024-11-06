import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
    { path: 'menuInfo', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
    { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];
