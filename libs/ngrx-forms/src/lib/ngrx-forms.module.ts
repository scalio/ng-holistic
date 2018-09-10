import { ModuleWithProviders, NgModule } from '@angular/core';
import { PreloadItemConfig, PRELOAD_ITEM_CONFIG } from './resolvers';

@NgModule({
    declarations: [],
    imports: [],
    exports: []
})
export class NgrxFormsModule {
    static forRoot(config: PreloadItemConfig): ModuleWithProviders {
        return {
            ngModule: NgrxFormsModule,
            providers: [
                {
                    provide: PRELOAD_ITEM_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
