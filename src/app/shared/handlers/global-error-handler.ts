import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '../services/error.service';
import {LoggingService} from '../services/logging.service';
import {NotificationService} from '../services/notification.service';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private _notification: NotificationService) {
  }

  handleError(error: Error | HttpErrorResponse): void {

    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);

    let message;
    let stackTrace;
    console.log(JSON.stringify(error))


    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);
      this._notification.showError(message);
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      let parseMessage: any;

      if (error.message.includes('{')) {
        parseMessage = JSON.parse(error.message) as any;
      }
      this._notification.showError(message);
      stackTrace = errorService.getClientStack(error);

      // Always log errors
      logger.logError(message, stackTrace);
    }
  }
}
