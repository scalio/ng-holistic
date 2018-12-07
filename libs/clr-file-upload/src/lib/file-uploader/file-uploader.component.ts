import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnInit,
    Output,
    Input,
    InjectionToken,
    Inject,
    Optional
} from '@angular/core';
import { UploadEvent } from 'ngx-file-drop';

export interface FileUploaderLabels {
    dragLabel: string;
    orLabel: string;
    clickForUploadLabel: string;
    acceptFilesLabel: string;
}

export interface FileUploaderConfig {
    labels?: FileUploaderLabels;
}

const defaultLabels: FileUploaderLabels = {
    dragLabel: 'Drag files here',
    orLabel: 'or',
    clickForUploadLabel: 'Click for upload',
    acceptFilesLabel: 'Accept files'
};

export const HLC_FILE_UPLOADER_CONFIG = new InjectionToken<FileUploaderConfig>('HLC_FILE_UPLOADER_CONFIG');

@Component({
    selector: 'hlc-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent implements OnInit {
    // allows add only single file
    @Input() single: boolean | undefined;
    @Input() disabled: boolean;
    @Input() accept: string | undefined;
    @Output() filesAdded = new EventEmitter<File[]>();

    private _rand = Math.random();
    get fileUploaderName() {
        return `file-upload-${this._rand}`;
    }

    constructor(@Optional() @Inject(HLC_FILE_UPLOADER_CONFIG) private readonly config: FileUploaderConfig) {}

    ngOnInit() {}

    get labels() {
        return (this.config && this.config.labels) || defaultLabels;
    }

    onFileChange(event: any) {
        if (!event) {
            return;
        }
        const ctrl = event.target;
        const files = Array.prototype.slice.call(ctrl.files, 0);
        if (files && files.length === 0) {
            return;
        }

        this.addFiles(files);
    }

    onFileDrop(event: UploadEvent) {
        const files = Array.prototype.slice.call(event.files, 0);
        if (!files || files.length === 0) {
            return;
        }
        const fileEntries = files.filter((file: any) => file.fileEntry.isFile).map((file: any) => file.fileEntry);

        this.addFiles(fileEntries);
    }

    onFileOver(_: any) {}

    onFileLeave(_: any) {}

    private checkAccept(fileName: string) {
        if (this.accept) {
            const accept = this.accept.replace(/\s/g, '').replace(/,/g, '|');
            const regex = new RegExp(`.*(${accept})$`);
            if (!regex.test(fileName)) {
                return false;
            }
        }

        return true;
    }

    private addFiles(files: File[]) {
        files = files.filter(file => this.checkAccept(file.name));
        if (files.length === 0) {
            return;
        }
        this.filesAdded.emit(files);
    }
}
