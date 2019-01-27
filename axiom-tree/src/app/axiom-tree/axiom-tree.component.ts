import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

export interface IAxiomTreeSearch {
  (item: any, search: string): boolean
};

export interface AxiomTreeSelectionHandlerEvent {
  item: any;
  selected: boolean;
}

export class AxiomTreeComponentCommon {
  @Input() axId: string;
  @Input() axTitle: string;
  @Input() axCollectionItem: string;
  @Input() axSearchValue: string;
  @Input() axSelectable: boolean;
  @Input() axSearch: IAxiomTreeSearch;
  @Input() axTemplate: TemplateRef<any>;
  @Input() axDragDrop: boolean;
  @Input() axAsync: boolean;
  @Input() axLeaf: string;
  @Input() axAsyncReader: (node: any) => Observable<any[]>;
  @Output() axSelect = new EventEmitter();
}

@Component({
  selector: 'ax-tree',
  templateUrl: './axiom-tree.component.html',
  styleUrls: ['./axiom-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ax-tree'
  }
})
export class AxiomTreeComponent extends AxiomTreeComponentCommon implements OnInit {

  @Input() axData: any[] | Observable<any[]>
  @Input() axSelected: any[];
  @Output() axSelection = new EventEmitter<any[]>();
  data: any[];

  private selectionList = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.setData();
    if (this.axSelectable === undefined) {
      this.axSelectable = false;
    }
    if (this.axDragDrop === undefined) {
      this.axDragDrop = false;
    }
    if (this.axAsync === undefined) {
      this.axAsync = false;
    }
  }

  selectHandler($event: any): void {
    this.axSelect.emit($event);
  }

  selectionHandler($event: AxiomTreeSelectionHandlerEvent): void {
    if ($event.selected) {
      this.selectionList.push($event.item);
    }
    else {
      var index = this.selectionList.findIndex(i => i[this.axId] === $event.item[this.axId]);
      if (index >= 0) {
        this.selectionList.splice(index, 1);
      }
    }
    this.axSelected = this.selectionList;
    this.axSelection.emit(this.selectionList);
  }

  private setData(): void {
    this.data = [];
    if (!this.axData) {
      return;
    }
    if (this.axData instanceof Observable) {
      this.axData.subscribe(data => this.data = data, error => {
        console.error("Error while getting data!");
      });
    }
    else {
      this.data = this.axData;
    }
  }


}
