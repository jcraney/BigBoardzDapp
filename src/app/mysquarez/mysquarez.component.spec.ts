import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysquarezComponent } from './mysquarez.component';

describe('MysquarezComponent', () => {
  let component: MysquarezComponent;
  let fixture: ComponentFixture<MysquarezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysquarezComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysquarezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
