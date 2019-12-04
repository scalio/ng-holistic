export const isFileInstance = (file: any) => {
    // The actual condition should be File instanceof File
    // But files created with cypress is not recognized as instanceof File here
    // if (File instanceof File) {
    return file && file.constructor && file.constructor.name === 'File';
};
