import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logError(message: string, stack: string | undefined): void {
    // Send errors to be saved here
    // It's also possible to send the error to an api and log them there
    // The console.log is only for testing this example.
    console.log('LoggingService: ' + message);
  }
}
