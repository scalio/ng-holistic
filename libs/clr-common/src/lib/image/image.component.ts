import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HlcFilePreviewOverlayService } from '../file-preview-overlay/file-preview-overlay.service';
import emptySrc from './image-empty-src';

export type ImageState = 'ready' | 'loading' | 'empty';

@Component({
    selector: 'hlc-clr-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrImageComponent implements OnInit {
    static intancesCount = 0;
    instanceId: string;

    constructor(private readonly filePreviewOverlay: HlcFilePreviewOverlayService) {}

    @Input() processing = false;
    @Input() allowUpload = true;
    @Input() allowRemove = true;
    @Input() allowPreview = true;
    @Input() state: ImageState | undefined;
    @Input() src: string | undefined;
    @Input() emptySrc: string;
    @Input() title: string;
    @Input() height: number;
    @Input() width: number;

    @Output() click = new EventEmitter();
    @Output() removeClick = new EventEmitter();
    @Output() uploadFile = new EventEmitter<File>();
    @Output() previewClick = new EventEmitter();

    ngOnInit() {
        this.instanceId = `image_component_${HlcClrImageComponent.intancesCount}`;
        HlcClrImageComponent.intancesCount++;
    }

    get _emptySrc() {
        return this.emptySrc || emptySrc;
    }

    get isLoading() {
        return this.state === 'loading';
    }

    get isReady() {
        return this.state ? this.state === 'ready' : this.src;
    }

    get isEmpty() {
        return this.state ? this.state === 'empty' : !this.src;
    }

    onClick() {}

    onPreviewClick() {
        if (this.src) {
            this.filePreviewOverlay.open(this.src);
            this.previewClick.emit();
        }
    }

    onRemoveClick() {
        this.removeClick.emit();
    }

    onUploadFile(event: any) {
        if (!event) {
            return;
        }
        const ctrl = event.target;
        const files = Array.prototype.slice.call(ctrl.files, 0);
        if (files && files.length === 0) {
            return;
        }

        this.uploadFile.emit(files[0]);
    }
}
