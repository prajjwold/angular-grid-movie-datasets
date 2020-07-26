import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDataService } from './services/movie-data.service';
import { MaterialModule } from './material.components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginatorComponent } from './shared-components/paginator/paginator.component';
import { SearchComponent } from './shared-components/search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        MovieListComponent,
        PaginatorComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    providers: [MovieDataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
