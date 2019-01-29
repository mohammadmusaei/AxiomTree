# Axiom Tree


### Online Demo

[Usage Demo](http://app.musaei.me/angular/tree/)

### Stackblitz Demo

[Edit demo on stackblitz](https://stackblitz.com/edit/axiom-ngx-tree)

### Installation

##### Install component package from npm :

`$npm install axiom-ngx-tree`

##### Import component module :

```typescript
import { AxiomNgxTreeModule } from 'axiom-ngx-tree';

...

@NgModule({
  imports: [
    BrowserModule,
    AxiomNgxTreeModule,
  ], 
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})

...

```

### Usage

```html

<ax-ngx-tree [axData]="data" 
    (axSelect)="select($event)" 
    [axSearch]= "search"
    [axSearchValue]="model" 
    [axTitle]="'country'" 
    [axId]="'id'" 
    [axSelectable]="true"
    [axDragDrop]="true"
    [axCollectionItem]="'items'" 
    (axSelection)="selected($event)"
    [axTemplate]="t">
</ax-ngx-tree>

```

##### Use custom templates for nodes

First, Create a template tag then use `item` property to access node data

```html

<ng-template #t let-item="item">
    {{ item.first_name }} {{ item.last_name }}
</ng-template>

```

Then pass custom template reference to `[axTemplate]` input parameter

```html

[axTemplate]="t"

```

### Drag and drop support

For add drag and drop feature just set `[axDragDrop]` property value to true

![Alt Text](https://media.giphy.com/media/iOyDWDp3aKvHwPBxMU/giphy.gif)

### @Input() Params

| Name | Usage |
| ------ | ------ |
| axId | Data uniqueidentifier property name |
| axTitle | Default node title (Used in nodes without custom template ) |
| axCollectionItem | Name list propery (like items in an object) |
| axSearchValue | Search model value for providing instant search |
| axSelectable | Make tree selectable |
| axSearch | Search function with type (item: any, search: string): boolean |
| axTemplate | Make custom node template |
| axDragDrop | Add drag and drop feature |
| axAsync | Set tree to work async |
| axLeaf | Data propery name to check a node is leaf in data tree or not (Just use in async mode) |
| axAsyncReader | Reader function to get async data for inner nodes |
| axData | Tree data |

### @Output() Params

| Name | Usage |
| ------ | ------ |
| axSelection | Emit an array containing selected nodes |
| axSelect | Emit a object refers to current node |


## License

[MIT](http://opensource.org/licenses/MIT)
