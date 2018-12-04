export namespace Mask {

    export type MaskTemplate = (string | RegExp)[];

    export interface MaskOpts {
        mask: MaskTemplate;
        keepCharPositions: boolean;
        placeholderChar: string;
    }

    export type MaskValue = MaskTemplate | MaskOpts;

    export type UnmaskFun = ((val: string) => any) | undefined;
}