import { Component, OnInit, Input } from '@angular/core';
import { SimulationNodeDatum } from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appNodeVisual]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input() appNodeVisual: SimulationNodeDatum;
  @Input() labelAccessor: string;
  @Input() radius = 10;
  @Input() style: {} = {
    'fill': 'blue'
  };
  @Input() labelX = 0;
  @Input() labelY = 10;
  @Input() labelAlignmentBaseling = 'hanging';
}
