import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AxiomTreeNodeComponent } from './axiom-tree-node.component';
import { AxiomTreeComponent } from './axiom-tree.component';

@NgModule({
    declarations: [AxiomTreeComponent,AxiomTreeNodeComponent,],
    exports: [AxiomTreeComponent,AxiomTreeNodeComponent],
    imports: [CommonModule,FormsModule,ReactiveFormsModule],
    entryComponents: [AxiomTreeComponent,AxiomTreeNodeComponent]
})
export class AxiomTreeModule { }