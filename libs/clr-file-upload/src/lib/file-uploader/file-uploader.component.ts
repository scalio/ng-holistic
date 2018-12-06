import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UploadEvent } from 'ngx-file-drop';

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
    constructor() {}

    ngOnInit() {}

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
