import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hlcPrettyJson' })
export class HlcPrettyJsonPipe implements PipeTransform {
    transform(value: any) {
        return value && JSON.stringify(value, null, 2);
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [HlcPrettyJsonPipe],
    exports: [HlcPrettyJsonPipe],
    providers: [HlcPrettyJsonPipe]
})
export class HlcPrettyJsonModule {}
