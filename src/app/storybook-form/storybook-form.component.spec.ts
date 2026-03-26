import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { StorybookFormComponent } from './storybook-form.component';

describe('StorybookFormComponent', () => {
  let component: StorybookFormComponent;
  let fixture: ComponentFixture<StorybookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookFormComponent],
      providers: [provideHttpClient()]
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

  it('should reset form and state when success popup is closed', () => {
    component.showSuccessPopup = true;
    component.isPdfReady = true;
    component.submitError = 'Some error';
    component.captchaError = 'Captcha error';
    component.generationProgress = 80;
    component.storyForm.patchValue({
      hero: { name: 'Alex', gender: 'male', age: '10', bodyTone: 'Athletic' },
      world: { location: 'Ancient Egypt', theme: 'fantasy', event: 'Epic Battle', mood: 'exciting' },
      others: { character: 'dog', moral: 'courage', notes: 'note' },
      captcha: 'ABC123'
    });

    component.closeSuccessPopup();

    expect(component.showSuccessPopup).toBeFalse();
    expect(component.isPdfReady).toBeFalse();
    expect(component.submitError).toBe('');
    expect(component.captchaError).toBe('');
    expect(component.generationProgress).toBe(0);
    expect(component.storyForm.get('hero.name')?.value).toBeNull();
    expect(component.storyForm.get('captcha')?.value).toBe('');
  });
});
