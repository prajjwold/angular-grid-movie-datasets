import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    private readonly searchTextEmitter: EventEmitter<string> = new EventEmitter<string>();

    public searchText: string;

    @Output()
    public get onSearch(): Observable<string> {
        return this.searchTextEmitter.asObservable();
    }
    public fireSearchEvent() {
        // if (!!this.searchText && this.searchText.length > 3) {
        //     this.searchTextEmitter.emit(this.searchText);
        // }

        this.searchTextEmitter.emit(this.searchText);
    }
}
