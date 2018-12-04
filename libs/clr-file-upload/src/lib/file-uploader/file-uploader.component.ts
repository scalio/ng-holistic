import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UploadEvent } from 'ngx-file-drop';

@Component({
    selector: 'hlc-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent implements OnInit {
    @Input() files: File[];
    // allows add only single file
    @Input() single: boolean | undefined;
    @Input() disabled: boolean;
    @Input() accept: string | undefined;
    @Output() filesChange = new EventEmitter<File[] | null>();

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

        files.forEach((file: any) => this.addFile(file));
    }

    onFileDrop(event: UploadEvent) {
        const files = Array.prototype.slice.call(event.files, 0);
        if (!files || files.length === 0) {
            return;
        }
        files.filter((file: any) => file.fileEntry.isFile).map((file: any) => this.addFile(file.fileEntry));
    }

    onFileOver(_: any) {}

    onFileLeave(_: any) {}

    get fileNames() {
        return (this.files || []).map(file => file.name);
    }

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

    private addFile(file: File | null) {
        if (!file) {
            return;
        }
        if (!this.checkAccept(file.name)) {
            return;
        }
        if (this.single) {
            this.files = [file];
        } else {
            this.files = [...(this.files || []), file];
        }
        this.filesChange.emit(this.files);
    }
}
