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
