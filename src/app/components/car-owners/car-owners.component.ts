import { Component, OnInit } from '@angular/core';
import { CarService } from '../../shared/car/car.service';
import { GiphyService } from '../../shared/giphy/giphy.service';
import { OwnersService} from '../../shared/owners/owners.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit {
  owners: Array<any>;
  direccion: Array<string>=[]
  
  constructor(private ownerService: OwnersService , private giphyService: GiphyService) { }

  ngOnInit() {
    
    this.ownerService.getOwners().subscribe(data => {
      this.owners = data._embedded.owners;
      console.log(this.owners);
      this.owners.forEach((owner,index)=>{
        this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
        let json = JSON.stringify(this.owners[index]._links.self.href);   
        this.direccion.push(json.substring(51,json.length-1));
        console.log(this.direccion)
      })
    });      
  }
}
