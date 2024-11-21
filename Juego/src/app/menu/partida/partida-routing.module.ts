import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NuevaCargarComponent } from "./nueva-cargar/nueva-cargar.component";
import { NuevaPartidaComponent } from "./elegir-partida/nueva-partida/nueva-partida.component";

const routes: Routes = [
    { path: '', component: NuevaCargarComponent },
    { path: 'elegirPartida', loadChildren: () => import('.//partida.module').then(m => m.PartidaModule) },
    { path: 'nuevaPartida', component: NuevaPartidaComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PartidaRoutingModule {


}