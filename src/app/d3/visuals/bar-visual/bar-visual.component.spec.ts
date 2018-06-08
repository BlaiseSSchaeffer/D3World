import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarVisualComponent } from './bar-visual.component';

describe('BarVisualComponent', () => {
  let component: BarVisualComponent;
  let fixture: ComponentFixture<BarVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
