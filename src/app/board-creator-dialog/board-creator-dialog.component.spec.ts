import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCreatorDialogComponent } from './board-creator-dialog.component';

describe('BoardCreatorDialogComponent', () => {
  let component: BoardCreatorDialogComponent;
  let fixture: ComponentFixture<BoardCreatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCreatorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
