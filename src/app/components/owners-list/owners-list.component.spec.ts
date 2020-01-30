import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersListComponent } from './owners-list.component';

describe('OwnersListComponent', () => {
  let component: OwnersListComponent;
  let fixture: ComponentFixture<OwnersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
