import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagraphicsViewComponent } from './anagraphics-view.component';

describe('AnagraphicsViewComponent', () => {
  let component: AnagraphicsViewComponent;
  let fixture: ComponentFixture<AnagraphicsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnagraphicsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnagraphicsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
