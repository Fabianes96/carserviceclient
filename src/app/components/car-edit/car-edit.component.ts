import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../shared/car/car.service';
import { GiphyService } from '../../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';
import { OwnersService } from '../../shared/owners/owners.service'

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  owner: any = {};
  sub: Subscription;
  json: {}={};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private giphyService: GiphyService,
    private ownerService: OwnersService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
            this.ownerService.getOwners().subscribe((ownerData: any) => {              
              if (ownerData) {
                this.owner = ownerData._embedded.owners;
                console.log(this.owner)
                for (const own of this.owner) {                     
                  if (own.dni == car.ownerDni) {
                    this.json = { nameCar: car.name, ownerName: own.name, ownerDni: own.dni, ownerhref:own._links.self.href }
                    console.log(this.json)
                  }                  
                }
              }
            })
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }          
        });
      }
    });
    console.log(this.sub)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }

  save(form: NgForm) {
    this.carService.save(form).subscribe(result => { 
        console.log(form.value)    
        this.gotoList();
     
    }, error => console.error(error));
  }

  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}

