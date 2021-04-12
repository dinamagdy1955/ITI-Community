import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDropdowenComponent } from './home-dropdowen.component';

describe('HomeDropdowenComponent', () => {
  let component: HomeDropdowenComponent;
  let fixture: ComponentFixture<HomeDropdowenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDropdowenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDropdowenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
