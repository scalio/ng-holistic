import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FileSystemFileEntry, UploadEvent } from 'ngx-file-drop';
@Component({
    selector: 'hlc-file-uploader',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent implements OnInit {
    selectedFileName: string | null;
    @Input() accept: string | undefined;
    @Output() fileChange = new EventEmitter<File | null>();

    constructor() {}

    ngOnInit() {}

    onFileChange(event: any) {
        if (!event) {
            return;
        }
        const ctrl = event.target;
        if (ctrl.files && ctrl.files.length === 0) {
            return;
        }

        this.updateFile(ctrl.files[0]);
    }

    onFileDrop(event: UploadEvent) {
        const files = event.files;
        if (!files || files.length === 0 || !files[0].fileEntry.isFile) {
            return;
        }

        const fileEntry = files[0].fileEntry as FileSystemFileEntry;
        fileEntry.file(file => this.updateFile(file));
    }

    onFileOver(event: any) {}

    onFileLeave(event: any) {}

    onRemove() {
        this.selectedFileName = null;
        this.fileChange.emit(null);
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

    private updateFile(file: File | null) {
        if (!file) {
            return;
        }
        if (!this.checkAccept(file.name)) {
            return;
        }
        this.selectedFileName = file.name;
        this.fileChange.emit(file);
    }
}
