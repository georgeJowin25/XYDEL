import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManualLocationPage } from './manual-location.page';

describe('ManualLocationPage', () => {
  let component: ManualLocationPage;
  let fixture: ComponentFixture<ManualLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManualLocationPage);
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

