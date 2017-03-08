import { Injectable } from '@angular/core';
import {Vehicle} from './vehicle';

@Injectable()
export class VehicleService {

  constructor() { }

  private vehicles: Vehicle[]=
  [
  new Vehicle("Van","Dolphin","Very spacious and comfy","http://lankavehiclesale.com/uploads/20121228063413.jpg"),
  new Vehicle("Van","Hiace","ok spacious and comfy","http://image-cdn.beforward.jp/files/pictures/201212/83192/BF88933_1.jpg"),
  new Vehicle("Car","Benz","Beaty","http://o.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/750x422/quality/95/http://www.blogcdn.com/slideshows/images/slides/282/225/0/S2822250/slug/l/03-2015-mercedes-benz-c-class-sd-1.jpg"),
  new Vehicle("Car","BMW","Elegant","http://buyersguide.caranddriver.com/media/assets/submodel/7810.jpg"),
  new Vehicle("Cab","Regular","Elegant","https://regmedia.co.uk/2008/10/21/black_cab_1.jpg?x=1200&y=794"),
  new Vehicle("Cab","Maruti","Elegant","https://images0.cardekho.com/images/car-images/520x216/Maruti/Maruti800/maruti-800-brick-red.jpg"),
  new Vehicle("Cab","Mini Cab","Elegant","https://images0.cardekho.com/images/car-images/large/Maruti/Maruti-MR-Wagon/047.jpg")
  ];

  getVehicles(type : string)
  {
  	return this.vehicles.filter(vehicle=>vehicle.type===type);
  }

}
