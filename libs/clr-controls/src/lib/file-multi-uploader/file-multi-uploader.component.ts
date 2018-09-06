import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UploadEvent } from 'ngx-file-drop';
import * as R from 'ramda';

@Component({
    selector: 'hlc-file-multi-uploader',
    templateUrl: './file-multi-uploader.component.html',
    styleUrls: ['./file-multi-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileMultiUploaderComponent implements OnInit {
    files: File[];
    @Input() multiple = true;
    @Input() accept: string | undefined;
    @Output() filesChange = new EventEmitter<File[] | null>();

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
        console.log('+++', this.files);
        return (this.files || []).map(file => file.name);
    }

    onRemove(index: number) {
        this.files = R.remove(index, 1, this.files);
        this.filesChange.emit(this.files);
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
        this.files = [...(this.files || []), file];
        this.filesChange.emit(this.files);
    }
}
