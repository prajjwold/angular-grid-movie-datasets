import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { Movie } from 'src/app/models/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
    private movieList: Array<Movie>;
    public dataSource: MatTableDataSource<Movie>;
    @ViewChild(MatSort, { static: true }) public sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

    public displayedColumns: string[];
    public pageSize = 50;

    public get numPages(): number {
        return this.paginator.getNumberOfPages();
    }
    public get currPage(): number {
        return this.paginator.pageIndex;
    }

    public pageEvent: PageEvent;
    public readonly pageSizeOptions = [10, 20, 40, 50, 100];

    public readonly COLUMNS: Array<string> = [
        'star',
        'rank',
        'title',
        'genre',
        'description',
        'director',
        'actors',
        'year',
        'runtimeMinutes',
        'rating',
        'votes',
        'revenueMillions',
        'metascore',
        'custom'
    ];

    constructor(private movieDataService: MovieDataService) { }
    public ngOnInit(): void {
        this.movieDataService.getMovieData().subscribe(data => {
            this.movieList = data;
            this.displayedColumns = this.COLUMNS.slice(0, 6).concat('custom');
            this.dataSource = new MatTableDataSource(this.movieList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    public handlePageSizeChanged(pageSize: number) {
        this.paginator.pageSize = pageSize;
        this.paginator._changePageSize(pageSize);
    }

    public handlePageNumberClicked(page: number) {
        this.paginator.pageIndex = page;
        this.paginator._changePageSize(this.paginator.pageSize);
    }

    public expand() {
        this.displayedColumns = this.COLUMNS;
    }

    public handleSearchEvent(searchText: string) {
        if (searchText == null || searchText === '') {
            this.movieDataService.getMovieData().subscribe(data => {
                this.movieList = data;
                this.dataSource.data = data;
            });
        }
        else {
            this.movieDataService.getMovieDataBySearchText(searchText).subscribe(data => {
                this.movieList = data;
                this.dataSource.data = data;
            });
        }
    }
}
