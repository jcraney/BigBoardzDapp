import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBoardzComponent } from './open-boardz.component';

describe('OpenBoardzComponent', () => {
  let component: OpenBoardzComponent;
  let fixture: ComponentFixture<OpenBoardzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenBoardzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBoardzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
