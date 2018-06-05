import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { D3Service } from '../../services/d3.service';
import { SimulationNodeDatum } from 'd3';
import { ForceDirectedCluster } from '../../models/force-directed-cluster.model';
import { SvgOptions } from '../../models/svg-options.model';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent implements OnInit {
  @Input() nodes: SimulationNodeDatum[];
  cluster: ForceDirectedCluster;
  private _svgOptions = new SvgOptions(800, 800);

  constructor(
    private d3Service: D3Service,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cluster = this.d3Service.getForceDirectedCluster(this.nodes, this.svgOptions);

    this.cluster.ticker.subscribe(
      () => {
        this.ref.markForCheck();
      }
    );
  }

  get svgOptions() {
    return this._svgOptions = new SvgOptions(window.innerWidth, window.innerHeight);
  }

}
