export interface AttachmentType {
    id: string;
    documentType?: string;
    contentType?: string;
    fileName?: string;
    url?: string;
    readonly?: boolean;
    description?: string;
}
