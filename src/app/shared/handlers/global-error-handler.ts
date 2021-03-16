import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import { LoggingService } from '../services/logging.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private _injector: Injector, private _notificationService: NotificationService) {}

    handleError(error: Error | HttpErrorResponse): void {
        const errorService = this._injector.get(ErrorService);
        const logger = this._injector.get(LoggingService);

        let message;
        let stackTrace;
        console.log(JSON.stringify(error));

        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = errorService.getServerMessage(error);
            stackTrace = errorService.getServerStack(error);
            this._notificationService.showError(message);
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            let parseMessage: any;

            if (error.message.includes('{')) {
                parseMessage = JSON.parse(error.message) as any;
            }
            this._notificationService.showError(message);
            stackTrace = errorService.getClientStack(error);

            // Always log errors
            logger.logError(message, stackTrace);
        }
    }
}
