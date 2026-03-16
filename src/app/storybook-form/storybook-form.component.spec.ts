import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorybookFormComponent } from './storybook-form.component';

describe('StorybookFormComponent', () => {
  let component: StorybookFormComponent;
  let fixture: ComponentFixture<StorybookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorybookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('captcha should be loaded', () => {
    expect(component.captchaCode).toBeTruthy();
  });

  it('name is mandatory', () => {
    const nameControl = component.storyForm.get('hero.name');
    nameControl?.setValue('');
    expect(component.storyForm?.valid).toBeFalse();
  });
});
