import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
    private readonly pageNumberChangedEmitter: EventEmitter<number> = new EventEmitter<number>();
    private readonly pageSizeChangedEmitter: EventEmitter<number> = new EventEmitter<number>();

    public selectedPageSize = 50;
    public pageList = [1, 2, 3, 4, 5];
    public pageStart = 0;
    public pageEnd = this.selectedPageSize;

    @Input()
    public totals: number;

    @Input()
    public numPages: number;

    @Input()
    public currPage: number;

    @Input()
    public pageSizeOptions: Array<number>;

    @Output()
    public get pageNumberClicked(): Observable<number> {
        return this.pageNumberChangedEmitter.asObservable();
    }

    @Output()
    public get pageSizeChanged(): Observable<number> {
        return this.pageSizeChangedEmitter.asObservable();
    }

    public gotoPage = this.currPage;

    public fireGoToPageClickedEvent() {
        this.currPage = +this.gotoPage;
        this.updatePageList();
        this.pageNumberChangedEmitter.emit(this.gotoPage);
    }
    public firePageNumberClickedEvent(page: number) {
        this.currPage = page;
        this.updatePageList();
        this.pageNumberChangedEmitter.emit(this.currPage);
    }

    public firePageSizeChangedEvent($event) {
        this.currPage = $event.value;
        this.updatePageList();
        this.pageSizeChangedEmitter.emit($event.value);
    }

    public fireGoToFirstPageEvent() {
        this.currPage = 0;
        this.updatePageList();
        this.pageNumberChangedEmitter.emit(0);
    }

    public fireGoToLastPageEvent() {
        const lastPage = this.numPages - 1;
        this.currPage = lastPage;
        this.updatePageList();
        this.pageNumberChangedEmitter.emit(lastPage);
    }

    public fireGoToPreviousPageEvent() {
        const prev = this.currPage > 0 ? this.currPage - 1 : this.currPage;
        this.currPage = prev;
        this.updatePageList();
        this.pageNumberChangedEmitter.emit(prev);
    }
    public fireGoToNextPageEvent() {
        const next = this.currPage < this.numPages ? this.currPage + 1 : this.currPage;
        this.currPage = next;
        this.updatePageList();
        this.pageNumberChangedEmitter.emit(next);
    }


    private updatePageList() {
        this.pageStart = this.currPage * this.selectedPageSize;
        this.pageEnd = (this.currPage + 1) * this.selectedPageSize;

        if (this.currPage < 3) {
            this.pageList = [1, 2, 3, 4, 5];
        }
        else if (this.currPage >= this.numPages - 3) {
            const i = this.numPages - 1;
            this.pageList = [i - 4, i - 3, i - 2, i - 1, i];
        }
        else {
            const i = this.currPage;
            this.pageList = [i - 2, i - 1, i, i + 1, i + 2];
        }
    }
}
