import { Routes } from '@angular/router';
import { StorybookFormComponent } from './storybook-form/storybook-form.component';

export const routes: Routes = [
    {path: 'storybook-form', component: StorybookFormComponent},
    {path: '', redirectTo: 'storybook-form', pathMatch: 'full'},
];
