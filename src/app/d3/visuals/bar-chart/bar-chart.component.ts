import { Component, OnInit } from '@angular/core';
import { SvgOptions } from '../../models/svg-options.model';
import { Bar } from '../../models/bar.model';
import { D3Service } from '../../services/d3.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  providers: [
    D3Service
  ]
})
export class BarChartComponent implements OnInit {
  private _svgOptions = new SvgOptions(800, 800);
  public bars: Bar[];
  private width: 100;
  private height: 20;

  constructor() { }

  ngOnInit() {
    const bars: Bar[] = [];
    let color: string;
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 15; j++) {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        bars.push(new Bar(10 + (j * 110), 10 + (i * 30), 100, 20, color));
      }
    }
    this.bars = bars;
  }

  get svgOptions() {
    return this._svgOptions = new SvgOptions(window.innerWidth, window.innerHeight);
  }


}
