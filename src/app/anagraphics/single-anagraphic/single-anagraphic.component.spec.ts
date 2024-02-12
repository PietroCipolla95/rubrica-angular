import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAnagraphicComponent } from './single-anagraphic.component';

describe('SingleAnagraphicComponent', () => {
  let component: SingleAnagraphicComponent;
  let fixture: ComponentFixture<SingleAnagraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleAnagraphicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleAnagraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
