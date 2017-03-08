import {RouterModule,Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShowcaseComponent} from './showcase/showcase.component';
import {ShowcaseItemsComponent} from './showcase/showcase-items.component';
//import {SHOWCASE_ROUTES} from './showcase/showcase.routes';

const APP_ROUTES: Routes=
[
	{path:'',redirectTo:'/home',pathMatch: 'full'},
	{path:'home',component:HomeComponent},
	{path:'showcase',component:ShowcaseComponent,
		children:
		 [
		 {path: ':type',component: ShowcaseItemsComponent}
		 ]
		}
];

export const routing = RouterModule.forRoot(APP_ROUTES);