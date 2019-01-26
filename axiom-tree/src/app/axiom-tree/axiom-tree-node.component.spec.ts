import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxiomTreeNodeComponent } from './axiom-tree-node.component';

describe('AxiomTreeNodeComponent', () => {
  let component: AxiomTreeNodeComponent;
  let fixture: ComponentFixture<AxiomTreeNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxiomTreeNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxiomTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
