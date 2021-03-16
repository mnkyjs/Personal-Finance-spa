import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material.module';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';

const modules = [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SharedRoutingModule];

const services = [AuthService];

@NgModule({
    declarations: [DialogBoxComponent],
    imports: [...modules],
    exports: [...modules],
    providers: [...services],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [...services],
        };
    }
}
