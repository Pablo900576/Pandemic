import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EleccionPartidaComponent } from './eleccion-partida/eleccion-partida.component';
import { NuevaPartidaComponent } from './nueva-partida/nueva-partida.component';
import { NuevaPartida2Component } from './nueva-partida2/nueva-partida2.component';

const routes: Routes = [
    { path: '', component: EleccionPartidaComponent },
    { path: 'partida1', component: NuevaPartidaComponent },
    { path: 'partida2', component: NuevaPartida2Component },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ElegirPartidaRoutingModule {


}