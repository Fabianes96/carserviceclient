import { Component, OnInit } from '@angular/core';
import { CarService } from '../../shared/car/car.service';
import { GiphyService } from '../../shared/giphy/giphy.service';
import { OwnersService} from '../../shared/owners/owners.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit {

  owners: Array<any>;
  constructor(private ownerService: OwnersService , private giphyService: GiphyService) { }

  ngOnInit() {
    this.ownerService.getOwners().subscribe(data => {
      this.owners = data._embedded.owners;
      console.log(this.owners);
      for(const owner of this.owners){
        this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
      }      
    });
  }
}
