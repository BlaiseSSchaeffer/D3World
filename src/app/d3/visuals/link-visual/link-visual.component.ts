import { Component, OnInit, Input } from '@angular/core';
import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appLinkVisual]',
  templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.scss']
})
export class LinkVisualComponent implements OnInit {
  @Input() appLinkVisual: SimulationLinkDatum<SimulationNodeDatum>;
  public source: SimulationNodeDatum;
  public target: SimulationNodeDatum;
  @Input() style: {} = {
    'stroke-width': '2',
    'stroke': 'gray'
  };

  ngOnInit() {
    if (this.appLinkVisual) {
      this.source = <SimulationNodeDatum>this.appLinkVisual.source;
      this.target = <SimulationNodeDatum>this.appLinkVisual.target;
    }
  }
}
