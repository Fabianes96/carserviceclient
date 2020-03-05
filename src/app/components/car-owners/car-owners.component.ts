import { Component, OnInit } from '@angular/core';
import { CarService } from '../../shared/car/car.service';
import { GiphyService } from '../../shared/giphy/giphy.service';
import { OwnersService} from '../../shared/owners/owners.service';


@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit {
    
  cars: Array<any>
  owners: Array<any>
  list: Array<any> =[]
  constructor(private carService: CarService, private ownerService :OwnersService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      // for (const car of this.cars) {
      //   this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);  
      // }
      this.ownerService.getOwners().subscribe(ownerData=>{
        this.owners = ownerData._embedded.owners
        
        this.cars.forEach((car)=>{
            for(const owner of this.owners){
              if(car.dni == owner.dni){                                
                this.giphyService.get(car.name).subscribe(url =>{ car.giphyUrl = url
                  this.list.push({name: owner.name, carName:car.name, giphyUrl:car.giphyUrl});
                });         
                
              }
            }
        })
      })
      
    });    
  }
}
