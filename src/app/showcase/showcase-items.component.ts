import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {Router,ActivatedRoute} from '@angular/router';
import {VehicleService} from './vehicle.service';
import {Vehicle} from './vehicle';


@Component({
  selector: 'app-showcase-items',
  templateUrl: './showcase-items.component.html',
  styleUrls: ['./showcase-items.component.css']
})
export class ShowcaseItemsComponent implements OnInit {

  private page;
  private vehicles : Vehicle [] = [];
  private subscription: Subscription; 	
  constructor(private router: Router,
              private route: ActivatedRoute,
              private vs: VehicleService) { }

  ngOnInit() {

  	this.subscription=this.route.params.subscribe
    (
      (params: any) => 
      {
        this.page=params['type'];
        this.vehicles=this.vs.getVehicles(this.page);        
      }
    )


  }

}
