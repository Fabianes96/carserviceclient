import { Component, OnInit } from '@angular/core';
import { CarService } from '../../shared/car/car.service';
import { GiphyService } from '../../shared/giphy/giphy.service';
import { OwnersService } from '../../shared/owners/owners.service';


@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit {

  owners: Array<any>;
  direccion: Array<string> = []

  constructor(private ownerService: OwnersService, private giphyService: GiphyService) { }

  ngOnInit() {

    this.ownerService.getOwners().subscribe(data => {
      this.owners = data._embedded.owners;
      console.log(this.owners);
      //Foreach para capturar los indices
      this.owners.forEach((owner, index) => {
        this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
        let json = JSON.stringify(this.owners[index]._links.self.href);
        this.direccion.push(json.substring(51, json.length - 1));
        console.log(this.direccion)
      })
    });
  }
  // remove(href: string) {
  //   return this.http.delete(href);
  // }
  deleteByCheckbox() {
    //var rmvBtn = document.getElementById('rmvBtn');

    var elements= document.querySelectorAll('.myitem');
    elements.forEach((element,index)=>{
      element[index].checked=true;
    })

    // rmvBtn.addEventListener('click', function () { var rmvCheckBoxes = document.getElementsByName('test');
    // for (var i = 0; i < rmvCheckBoxes.length; i++) {
    //    if (rmvCheckBoxes[i].checked){ 
    //      removeElm(rmvCheckBoxes[i]);}
    //     } 
    // }); 
    // function removeElm(elm){ 
    //   elm.parentElement.removeChild(elm);
    // }
  }
}
