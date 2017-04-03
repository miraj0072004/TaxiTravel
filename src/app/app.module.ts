import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { HomeComponent } from './home/home.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import {routing} from './app.routes';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { ShowcaseItemsComponent } from './showcase/showcase-items.component';

import {VehicleService} from './showcase/vehicle.service';
import { StaffComponent } from './staff/staff.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ShowcaseComponent,
    CarouselComponent,
    ShowcaseItemsComponent,
    StaffComponent,
    BookingComponent
  ],
  imports: [
    CarouselModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
