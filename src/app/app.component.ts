import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  storyForm!: FormGroup;
  locations: string[] = [
    'Ancient Egypt',
    'Cyberpunk City',
    'Enchanted Forest',
    'Underwater Kingdom',
    'Mountain Realm',
    'Steampunk Metropolis',
    'Desert Oasis',
    'Sky Islands'
  ];

  events: string[] = [
    'Lost Treasure',
    'Royal Coronation',
    'Mysterious Disappearance',
    'Epic Battle',
    'Festival of Lights',
    'Time Travel Accident',
    'Secret Mission',
    'Unexpected Reunion'
  ];
  filteredLocations: string[] = [];
  filteredEvents: string[] = [];
  captchaCode: string = '';
  captchaError: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupFilters();
    this.filteredEvents = this.events;
    this.filteredLocations = this.locations;
    this.generateCaptcha();
    // Listen for captcha input changes
    this.storyForm.get('captcha')?.valueChanges.subscribe(() => {
      this.checkCaptcha();
    });
  }

  initializeForm(): void {
    this.storyForm = this.formBuilder.group({
      hero: this.formBuilder.group({
        name: ['', Validators.required],
        gender: ['', Validators.required],
        age: ['', Validators.required],
        bodyTone: ['']
      }),
      world: this.formBuilder.group({
        location: ['', Validators.required],
        theme: ['', Validators.required],
        event: ['', Validators.required],
        mood: ['', Validators.required]
      }),
      others: this.formBuilder.group({
        character: ['', Validators.required],
        moral: ['', Validators.required],
        notes: ['']
      }),
      captcha: ['', Validators.required]
    });
  }

  generateCaptcha(): void {
    this.captchaCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.storyForm.get('captcha')?.setValue('');
    this.captchaError = '';
  }

  checkCaptcha(): void {
    const input = this.storyForm.get('captcha')?.value;
    if (!input) {
      this.captchaError = '';
      return;
    }
    if (input.toUpperCase() !== this.captchaCode) {
      this.captchaError = 'Captcha does not match. Please try again.';
    } else {
      this.captchaError = '';
    }
  }

  get isCaptchaValid(): boolean {
    return this.storyForm.get('captcha')?.value?.toUpperCase() === this.captchaCode;
  }

  setupFilters(): void {
    this.storyForm.get('world.location')?.valueChanges.subscribe(value => {
      this.filteredLocations = this.locations.filter(loc =>
        loc.toLowerCase().includes((value || '').toLowerCase())
      );
    });
    this.storyForm.get('world.event')?.valueChanges.subscribe(value => {
      this.filteredEvents = this.events.filter(ev =>
        ev.toLowerCase().includes((value || '').toLowerCase())
      );
    });
  }

  onSubmit(): void {
    this.checkCaptcha();
    if (!this.isCaptchaValid) {
      this.captchaError = 'Captcha does not match. Please try again.';
      this.storyForm.markAllAsTouched();
      return;
    }
    if (this.storyForm.valid) {
      // Handle form submission
      console.log('Story Form Data:', this.storyForm.value);
      this.generateCaptcha(); // Optionally reset captcha after submit
    } else {
      this.storyForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  // captchaQuestion and captchaAnswer are now public and accessible in the template
}