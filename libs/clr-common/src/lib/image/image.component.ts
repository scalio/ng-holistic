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
    static instancesCount = 0;
    instanceId: string;
    croppedImage = '';   
    isCropOn = false; 

    constructor(private readonly filePreviewOverlay: HlcFilePreviewOverlayService) {}
    
    @Input() processing = false;
    @Input() allowUpload = true;
    @Input() allowRemove = true;
    @Input() allowPreview = true;
    @Input() allowCrop = true;
    @Input() state: ImageState | undefined;
    @Input() src: string | undefined;
    @Input() emptySrc: string;
    @Input() title: string;
    @Input() height: number;
    @Input() width: number;
    
    @Input() allowCancelCrop = false;
    @Input() aspectRatio = 1;
    @Input() maintainAspectRatio = false;
    @Input() alignImage: 'center' | 'left' = 'center';

    @Output() click = new EventEmitter();
    @Output() removeClick = new EventEmitter();
    @Output() uploadFile = new EventEmitter<File>();
    @Output() previewClick = new EventEmitter();
    @Output() srcChanged = new EventEmitter<string>();

    ngOnInit() {
        this.instanceId = `image_component_${HlcClrImageComponent.instancesCount}`;
        HlcClrImageComponent.instancesCount++;
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

    //

    onCropOn() {
        this.isCropOn = true;
    }

    onCropAccept() {
        this.isCropOn = false;
        this.src = this.croppedImage;
        this.croppedImage = '';
        this.srcChanged.emit(this.src);
    }

    onCropCancel() {
        this.isCropOn = false;
        this.croppedImage = '';
    }

    get isSrcData() {
        return this.src && this.src.startsWith('data:image');
    }


    imageCropped(event: any) {
        this.croppedImage = event.base64;
    }    
}
