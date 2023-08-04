import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileNumberPage } from './mobile-number.page';

describe('MobileNumberPage', () => {
  let component: MobileNumberPage;
  let fixture: ComponentFixture<MobileNumberPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MobileNumberPage);
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
