import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickUpLocationPage } from './pick-up-location.page';

describe('PickUpLocationPage', () => {
  let component: PickUpLocationPage;
  let fixture: ComponentFixture<PickUpLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PickUpLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}
