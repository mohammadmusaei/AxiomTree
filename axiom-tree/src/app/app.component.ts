import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { IAxiomTreeSearch } from './axiom-tree/axiom-tree.component';
import { persons } from './sample-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  model : any;
  data = persons;

  selected(e){
    console.log(e);
  }
  select(e){
    console.log(e);
  }

  search : IAxiomTreeSearch = (item : any,search : string) : boolean => {
    return item.first_name.toLowerCase().indexOf(search) > -1;
  }
  
  constructor(){

  }

}
