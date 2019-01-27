import { HlcClrLinkCellComponent } from './link-cell/link-cell.component';
import { HlcClrImgCellComponent } from './img-cell/img-cell.component';

export const cellComponents = [HlcClrLinkCellComponent, HlcClrImgCellComponent];

export const cellsMap = {
    LinkColumn: HlcClrLinkCellComponent,
    ImgColumn: HlcClrImgCellComponent
};
