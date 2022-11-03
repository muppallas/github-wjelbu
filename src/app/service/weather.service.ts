import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice';
  constructor(private _http: HttpClient) {
  }

  weatherForecast(metric, region): Observable<any> {
    let constructedUrl = this.url + '/' + metric + '-' + region + '.json';
    return this._http.get(constructedUrl);
  }

}
