import { ChangeDetectionStrategy, Component, Input, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'hlc-tabs-layout',
    templateUrl: './tabs-layout.component.html',
    styleUrls: ['./tabs-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsLayoutComponent {
    activeTab = 0;
    @ViewChildren('vc', { read: ViewContainerRef })
    vc: QueryList<ViewContainerRef>;

    @Input()
    $content: any[];

    onSetTabActive(index: number) {
        this.activeTab = index;
    }

    isTabActive(index: number) {
        return this.activeTab === index;
    }
}
