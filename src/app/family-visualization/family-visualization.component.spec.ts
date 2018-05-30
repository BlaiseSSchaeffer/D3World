import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyVisualizationComponent } from './family-visualization.component';

describe('VisualizationComponent', () => {
  let component: FamilyVisualizationComponent;
  let fixture: ComponentFixture<FamilyVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyVisualizationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
