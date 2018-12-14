import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Optional,
    Output
} from '@angular/core';
import { UploadEvent } from 'ngx-file-drop';
import { FileUploaderConfig, FileUploaderLabels, HLC_CLR_FILE_UPLOADER_CONFIG } from './file-uploader.config';

const defaultLabels: FileUploaderLabels = {
    dragLabel: 'Drag files here',
    orLabel: 'or',
    clickForUploadLabel: 'Click for upload',
    acceptFilesLabel: 'Accept files'
};

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

    constructor(@Optional() @Inject(HLC_CLR_FILE_UPLOADER_CONFIG) private readonly config: FileUploaderConfig) {}

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

    async onFileDrop(event: UploadEvent) {
        const res = Array.prototype.slice.call(event.files, 0);
        if (!res || res.length === 0) {
            return;
        }
        const fileEntries = res.map((file: any) => file.fileEntry).filter((entry: any) => entry.isFile);

        const files: any[] = [];
        for (const fileEntry of fileEntries) {
            const file = await this.getFile(fileEntry);
            files.push(file);
        }

        this.addFiles(files);
    }

    private getFile(fileEntry: any) {
        return new Promise(resolve => fileEntry.file((file: any) => resolve(file)));
    }

    onFileOver(_: any) {}

    onFileLeave(_: any) {}

    private checkAccept(fileName: string) {
        if (this.accept) {
            const accept = this.accept.replace(/\s/g, '').replace(/,/g, '|');
            const regex = new RegExp(`.*(${accept.toLowerCase()})$`);
            if (!regex.test(fileName.toLowerCase())) {
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
