import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NuevaCargarComponent } from "./nueva-cargar/nueva-cargar.component";
import { EleccionPersonajeComponent } from "./eleccion-personaje/eleccion-personaje.component";

const routes: Routes = [
    { path: '', component: NuevaCargarComponent },
    { path: 'elegirPersonaje', component: EleccionPersonajeComponent },
    { path: 'elegirPartida', loadChildren: () => import('./elegir-partida/elegir-partida.module').then(m => m.ElegirPartidaModule) },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PartidaRoutingModule {


}