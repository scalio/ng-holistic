import { LinkCellComponent } from './link-cell/link-cell.component';
import { ImgCellComponent } from './img-cell/img-cell.component';

export const cellComponents = [LinkCellComponent, ImgCellComponent];

export const cellsMap = {
    LinkColumn: LinkCellComponent,
    ImgColumn: ImgCellComponent
};
