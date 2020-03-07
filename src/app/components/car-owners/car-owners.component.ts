import { Component, OnInit } from '@angular/core';
import { CarService } from '../../shared/car/car.service';
import { GiphyService } from '../../shared/giphy/giphy.service';
import { OwnersService } from '../../shared/owners/owners.service';


@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit {

  cars: Array<any>
  owners: Array<any>
  list: Array<any> = []
  control: boolean = true;
  constructor(private carService: CarService, private ownerService: OwnersService, private giphyService: GiphyService) { }

  ngOnInit() {
    //Se se obtienen los carros y dueños
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      this.ownerService.getOwners().subscribe(ownerData => {
        this.owners = ownerData._embedded.owners        
        this.cars.forEach((car) => {
          //Comparación por Dni
          for (const owner of this.owners) {
            if (car.ownerDni == owner.dni) {              
              this.giphyService.get(owner.name).subscribe(url => {
                owner.giphyUrl = url
                //Si los campos de dni son iguales, se guarda la información en un Json que se almacena en un array 
                this.list.push({ name: owner.name, carName: car.name, giphyUrl: owner.giphyUrl });
                //Control para saber si hay carros asociados a dueños
                this.control= false;
              });
            }
            
          }
        })
      })

    });
  }
}
