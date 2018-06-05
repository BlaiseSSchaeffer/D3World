import { Component, OnInit } from '@angular/core';
import { D3Service } from '../services/d3.service';
import { ClusterNode } from '../models/cluster-node.model';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-cluster-visualization',
  templateUrl: './cluster-visualization.component.html',
  styleUrls: ['./cluster-visualization.component.scss'],
  providers: [
    D3Service,
    NodeService
  ]
})
export class ClusterVisualizationComponent implements OnInit {
  nodes: ClusterNode[] = [];

  // Wanted to get this working: https://bl.ocks.org/mbostock/7881887
  // didn't have the time to get it for today.

  constructor() { }

  ngOnInit() {
    const nodes = [];
    let node: ClusterNode;
    for (let i = 0; i < 10; i++) {
      node = new ClusterNode();
      nodes.push(node);
    }
    this.nodes = nodes;
  }

}
