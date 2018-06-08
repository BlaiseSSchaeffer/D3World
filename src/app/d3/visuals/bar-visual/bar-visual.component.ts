import { Component, OnInit, Input } from '@angular/core';
import { Bar } from '../../models/bar.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appBarVisual]',
  templateUrl: './bar-visual.component.html',
  styleUrls: ['./bar-visual.component.scss']
})
export class BarVisualComponent implements OnInit {
  @Input() appBarVisual: Bar;

  constructor() { }

  ngOnInit() {
  }

}
