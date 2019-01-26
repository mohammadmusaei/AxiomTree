import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxiomTreeComponent } from './axiom-tree.component';

describe('AxiomTreeComponent', () => {
  let component: AxiomTreeComponent;
  let fixture: ComponentFixture<AxiomTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxiomTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxiomTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
