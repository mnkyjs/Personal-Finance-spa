import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
    };

    constructor(private _matSnackBar: MatSnackBar) {}

    showSuccess(message: string): void {
        this.config.panelClass = ['notification-success'];
        this._matSnackBar.open(message, 'X', this.config);
    }

    showError(message: string): void {
        this.config.panelClass = ['notification-error'];
        this._matSnackBar.open(`Fehler: ${message}`, 'X', this.config);
    }

    showWarning(message: string): void {
        this.config.panelClass = ['notification-warning'];
        this._matSnackBar.open(message, 'X', this.config);
    }

    showMessage(message: string): void {
        this.config.panelClass = ['notification-message'];
        this._matSnackBar.open(message, 'X', this.config);
    }
}
