# Axiom Tree

### Installation

1. Install component package from npm :

`npm install axiom-ngx-tree@latest`

2. Import component module :

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

### Online Demo

[Axiom ngx-tree stackblitx online demo](https://stackblitz.com/edit/axiom-ngx-tree)

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
