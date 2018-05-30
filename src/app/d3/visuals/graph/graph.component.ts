import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ForceDirectedGraph } from '../../models/force-directed-graph.model';
import { D3Service } from '../../services/d3.service';
import { SvgOptions } from '../../models/svg-options.model';
import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit {
  @Input() nodes: SimulationNodeDatum[];
  @Input() links: SimulationLinkDatum<SimulationNodeDatum>[];
  @Input() labelAccessor: string;
  graph: ForceDirectedGraph;
  private _svgOptions = new SvgOptions(800, 800);

  constructor(
    private d3Service: D3Service,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.svgOptions);

    this.graph.ticker.subscribe(
      () => {
        this.ref.markForCheck();
      }
    );
  }

  get svgOptions() {
    return this._svgOptions = new SvgOptions(window.innerWidth, window.innerHeight);
  }

}
