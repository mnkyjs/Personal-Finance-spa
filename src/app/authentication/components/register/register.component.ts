import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    hide = true;
    registerForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
        });
    }

    register(): void {
        this._authService.register(this.registerForm.value).subscribe((res) => {
            this._notificationService.showSuccess('Erfolgreich registriert!');
            this._router.navigate(['/login']);
        });
    }
}
