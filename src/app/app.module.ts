import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule ,MatToolbarModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { WeatherService } from './service/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [WeatherService, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

