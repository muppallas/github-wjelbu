import { Component } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { Chart } from 'chart.js';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather application';

  weatherQueryForm: FormGroup;
  region: string;
  metric: string;
  startDate: string;
  endDate: string;
  fromDate = new Date(1910, 0, 1);
  toDate = new Date(2017, 0, 1);

  regions: string[] = ['England', 'UK', 'Scotland', 'Wales'];
  metrics: string[] = ['Tmax', 'Tmin', 'Rainfall'];
  chart: Chart;
  other = [];
  error: any = { isError: false, errorMessage: '' };

  constructor(private _weather: WeatherService, private fb: FormBuilder) {
    this.weatherQueryForm = fb.group({
      'region': [null, Validators.required],
      'metric': [null, Validators.required],
      'startDate': [null, Validators.required],
      'endDate': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    if (new Date(this.weatherQueryForm.value.startDate) > new Date(this.weatherQueryForm.value.endDate)) {
      this.error = { isError: true, errorMessage: 'Start Date should be earlier than End Date' };
    } else {
      this.error = { isError: false, errorMessage: '' };
      let startdateobj = new Date(this.weatherQueryForm.value.startDate);
      let startmonth = startdateobj.getUTCMonth() + 1;
      let startyear = startdateobj.getUTCFullYear();
      let enddateobj = new Date(this.weatherQueryForm.value.endDate);
      let endmonth = enddateobj.getUTCMonth() + 1;
      let endyear = enddateobj.getUTCFullYear();
      let metric = this.weatherQueryForm.value.metric;
      let region = this.weatherQueryForm.value.region;

      this.filterJson(startmonth, startyear, endmonth, endyear, metric, region);
    }
  }

  filterJson(startmonth, startyear, endmonth, endyear, metric, region) {
    this._weather.weatherForecast(metric, region)
      .pipe(
        map(res => res.filter(data => data.year >= startyear && data.year <= endyear)),
        map(res => res.splice(startmonth)),
        map(res => res.splice(0, res.length - 12 + endmonth))
      )
      .subscribe(res => {
        let { yearDataset, valueDataset, monthDataset } = this.createDatasets(res);
        this.drawingChart(yearDataset, valueDataset, monthDataset, metric);
      });
  }

  private drawingChart(yearDataset: any[], valueDataset: any[], monthDataset: any[], metric) {
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: yearDataset,
        datasets: [
          {
            label: metric,
            data: valueDataset,
            borderColor: '#3cba9f',
            fill: true
          },
          {
            label: 'Month',
            data: monthDataset,
            borderColor: '#ffcc00',
            fill: true
          },
        ]
      },
      options: {
        legend: {
          display: true,
          responsive: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  private createDatasets(res: object) {
    let jsonArray: any = res;
    let yearDataset = [];
    let monthDataset = [];
    let valueDataset = [];

    jsonArray.forEach(element => {
      yearDataset.push(element.year);
      monthDataset.push(element.month);
      valueDataset.push(element.value);
    });
    
    return { yearDataset, valueDataset, monthDataset };
  }
}
