import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { AxiomTreeComponentCommon, AxiomTreeSelectionHandlerEvent } from './axiom-ngx-tree.component';

export enum AxiomTreeDragKey{
  AxItem = "axItem"
}

@Component({
  selector: '[ax-ngx-tree-node]',
  template: `
  
<i class="ax-tree-indicator" [ngClass]="{ 'open' : opened}" (click)="click($event)">
<svg *ngIf="hasChild" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
</i>

<input *ngIf="axSelectable" class="ax-tree-node-select" type="checkbox" 
[(ngModel)]="selected" 
(ngModelChange)="selectedChange($event)" >

<div class="ax-tree-node-value" 
#nodeValue 
(click)="select($event)" 
(drop)="drop($event)"
(dragover)="allowDrop($event)"
(dragleave)="dragLeave($event)"
[draggable]="axDragDrop"
(dragend)="dragEnd($event,axItem)"
(dragstart)="drag($event,axItem)"
tabindex="0">
<ng-container *ngIf="!axTemplate">
    {{ axItem[axTitle] }}
</ng-container>

<ng-container *ngTemplateOutlet="axTemplate;context:ctx">
</ng-container>
</div>

<div class="ax-tree-spinner" *ngIf="loading"></div>

<ng-container *ngIf="hasChild">
<ul [hidden]="!opened">
    <li *ngFor="let item of axItem[axCollectionItem];let index = index;trackBy:trackBy" 
    ax-ngx-tree-node 
    [axItem]="item" 
    [axTitle]="axTitle" 
    [axCollectionItem]="axCollectionItem" 
    (axSelect) = "selectHandler($event)"
    [axSearchValue] = "axSearchValue"
    [axSearch] = "axSearch"
    (iFound) = "iFoundHandler($event)"
    [axSelectable] = "axSelectable"
    [axId]="axId" 
    [axTemplate]="axTemplate"
    [axDragDrop]="axDragDrop"
    [axAsync]="axAsync"
    [axAsyncReader]="axAsyncReader"
    [axLeaf]="axLeaf"
    [parent]="axItem"
    (selection)="selectionHandler($event)">
  
    </li>
  </ul>
</ng-container>

  `,
  host : {
    '[class.dragover-node]': 'dragover'
  }
})
export class AxiomNgxTreeNodeComponent extends AxiomTreeComponentCommon implements OnInit, OnChanges {

  @Input() axItem: any;
  @Input() parent: any;
  @Output() iFound = new EventEmitter<boolean>();
  @Output() selection = new EventEmitter<AxiomTreeSelectionHandlerEvent>();
  @Output() refresh = new EventEmitter();
  @ViewChild('nodeValue') nodeValueElement: ElementRef;
  @ViewChildren(AxiomNgxTreeNodeComponent) children: QueryList<AxiomNgxTreeNodeComponent>;

  hasChild: boolean = false;
  ctx: any;
  opened: boolean;
  selected: boolean = false;
  selectionList = [];
  dragover = false;
  loading = false;

  constructor(private _renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    this.checkChildren();
    this.ctx = { item: this.axItem };
  }

  selectHandler($event: any): void {
    this.axSelect.emit($event);
  }

  click($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.opened = !this.opened;
    if(this.opened && this.axAsync){
      this.readAsyncData();
    }
  }

  select($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.axSelect.emit(this.axItem);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkForHighlight(changes);
  }

  selectedChange(selected: boolean): void {
    this.selection.emit({ item: this.axItem, selected: selected });
  }

  iFoundHandler(found: boolean): void {
    this.opened = found;
  }

  selectionHandler($event: AxiomTreeSelectionHandlerEvent): void {
    this.selection.emit($event);
    //
    var selected = this.checkAllChildrenSelected() === "all";
    this.selected = selected;
    this.selection.emit({ item: this.axItem, selected: selected });
  }

  refreshHandler($event) : void{
    this.checkChildren();
  }

  allowDrop($event : DragEvent) {
    this.dragover = true;
    $event.preventDefault();
  }

  dragLeave($event : DragEvent){
    this.dragover = false;
  }

  drag($event : DragEvent,item : any) {
    if(!item) return;
    $event.dataTransfer.setData(AxiomTreeDragKey.AxItem, JSON.stringify(item));
  }

  dragEnd($event : DragEvent,item : any) {
    if(!item) return;
    var index = (this.parent[this.axCollectionItem] || this.parent).findIndex(i=>i[this.axId] === item[this.axId]);
    if(index >= 0){
      (this.parent[this.axCollectionItem] || this.parent).splice(index,1);
      this.refresh.emit();
    }
  }

  drop($event : any) {
    $event.preventDefault();
    const data = JSON.parse($event.dataTransfer.getData(AxiomTreeDragKey.AxItem));
    if(data[this.axId] === this.axItem[this.axId]) return;
    if(!Array.isArray(this.axItem[this.axCollectionItem])){
      this.axItem[this.axCollectionItem] = [];
    }
    this.axItem[this.axCollectionItem].push(data);
    this.checkChildren();
    this.dragover = false;
  }

  trackBy(index:number,item : any) {
    return item[this.axId];
  }

  private readAsyncData() : void{
    if(typeof(this.axAsyncReader) === "function"){
      this.loading = true;
      this.axAsyncReader(this.axItem).subscribe(nodes=>{
        this.axItem[this.axCollectionItem] = nodes;
        this.loading = false;
      },error=>{
        this.loading = false;
        console.error("Error while getting async data!");
      });
    }
  }

  private checkForHighlight(changes  : SimpleChanges) : void{
    this.highlight(false);
    if(!changes.axSearchValue) return;
    var value = changes.axSearchValue.currentValue;
    if (!value || value === "") {
      this.opened = false;
      return;
    }
    if (this.axSearch(this.axItem, value)) {
      this.opened = true;
      this.highlight();
    }
    else {
      this.opened = false || this.checkChildrenFoundSomething();
    }
    if (this.opened) {
      setTimeout(() => {
        this.iFound.emit(this.opened);
      }, 200);
    }
  }

  private checkChildren() : void{
    this.hasChild = Array.isArray(this.axItem[this.axCollectionItem]) && this.axItem[this.axCollectionItem].length > 0;
    if(this.axAsync){
      this.hasChild = this.hasChild || !(this.axItem[this.axLeaf] && this.axItem[this.axLeaf] === false);
    }
  }

  private checkChildrenFoundSomething(): boolean {
    return this.children.filter(c => c.opened).length > 0;
  }

  private checkAllChildrenSelected(): "none" | "all" | "some" {
    var length =  this.children.filter(c => c.selected).length;
    if(length > 0 && length < this.children.length){
      return "some";
    }
    else if (length === this.children.length){
      return "all";
    }
    else{
      return "none";
    }
  }
  private highlight(highlight: boolean = true): void {
    if (highlight) {
      this._renderer.addClass(this.nodeValueElement.nativeElement, 'ax-tree-node-highlighter');
    }
    else {
      this._renderer.removeClass(this.nodeValueElement.nativeElement, 'ax-tree-node-highlighter');
    }
  }

}