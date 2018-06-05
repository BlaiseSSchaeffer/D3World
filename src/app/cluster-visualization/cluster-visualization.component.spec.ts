import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterVisualizationComponent } from './cluster-visualization.component';

describe('ClusterVisualizationComponent', () => {
  let component: ClusterVisualizationComponent;
  let fixture: ComponentFixture<ClusterVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
