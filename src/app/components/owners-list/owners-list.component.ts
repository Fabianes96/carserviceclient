import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../../shared/giphy/giphy.service';
import { OwnersService } from '../../shared/owners/owners.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit {

  owners: Array<any>;
  direccion: Array<string> = [];
  deleted: Array<boolean> = [];
  check: boolean;
  control: boolean = true;
  constructor(private ownerService: OwnersService, private giphyService: GiphyService, private router: Router) {
  }

  ngOnInit() {
    this.check = false;
    this.ownerService.getOwners().subscribe(data => {

      this.owners = data._embedded.owners;
      console.log(this.owners);
      if (this.owners.length == 0) {
        this.control = false;
      } else {
        //Foreach para capturar los indices
        this.owners.forEach((owner, index) => {
          this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
          //Se obtiene href del Json
          let json = JSON.stringify(this.owners[index]._links.self.href);
          //Se guarda en "direccion" el numero correspondiente a la dirección de cada owner obviando el resto de la url
          this.direccion.push(json.substring(51, json.length - 1));
          this.deleted.push(false);
        })
      }
    });
  }
  remove(href) {
    this.ownerService.remove(href).subscribe(result => {
      console.log("Propietario eliminado correctamente");
    }, error => console.error(error));
  }
  deleteByCheckbox() {

    var checkboxes: any = []
    //Obtener todos los checkbox
    checkboxes = document.querySelectorAll('.myitem');
    //Se elimina cada owner que tenga "checked"    
    checkboxes.forEach((element, index) => {
      if (element.checked) {
        this.remove(this.owners[index]._links.self.href);
        this.deleted[index] = true;

      }
    });

    setTimeout(() => {
      this.deleted = [];
      this.ngOnInit()
    }, 2000);
  }
  habilitar() {
    this.check = false;
    var checkboxes: any = []
    //Obtener todos los checkbox
    checkboxes = document.querySelectorAll('.myitem');
    //Se elimina cada owner que tenga "checked"    
    checkboxes.forEach((element) => {
      if (element.checked) {
        this.check = true;
      }
    });

  }

}
