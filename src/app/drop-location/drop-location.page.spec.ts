import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropLocationPage } from './drop-location.page';

describe('DropLocationPage', () => {
  let component: DropLocationPage;
  let fixture: ComponentFixture<DropLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DropLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
