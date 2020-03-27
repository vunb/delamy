import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy, HashLocationStrategy} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgArrayPipesModule, NgStringPipesModule, ShufflePipe } from 'angular-pipes';
import {HotkeyModule} from 'angular2-hotkeys';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';
import { ShuffleWordsPipe } from './pipes/text/ShuffleWordsPipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

/**
 * - Nếu là web sử dụng Path location strategy
 * - Nếu là app (electron) sử dụng Hash location strategy
 */
let locationStrategy: Provider = {
  provide: LocationStrategy,
  useClass: PathLocationStrategy
};

if (ElectronService.IS_ELECTRON) {
  locationStrategy = {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  };
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShuffleWordsPipe,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    HotkeyModule.forRoot(),
    NgArrayPipesModule,
    NgStringPipesModule
  ],
  providers: [
    ElectronService,
    ShufflePipe,
    locationStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
