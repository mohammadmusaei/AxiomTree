import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AxiomNgxTreeComponent } from './axiom-ngx-tree.component';
import { AxiomNgxTreeNodeComponent } from './axiom-ng-tree-node.component';

@NgModule({
    declarations: [AxiomNgxTreeComponent,AxiomNgxTreeNodeComponent,],
    exports: [AxiomNgxTreeComponent],
    imports: [CommonModule,FormsModule,ReactiveFormsModule],
    entryComponents: [AxiomNgxTreeComponent,AxiomNgxTreeNodeComponent]
})
export class AxiomNgxTreeModule { }
