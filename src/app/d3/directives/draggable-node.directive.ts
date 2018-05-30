import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { SimulationNodeDatum } from 'd3';
import { ForceDirectedGraph } from '../models/force-directed-graph.model';
import { D3Service } from '../services/d3.service';

@Directive({
  selector: '[appDraggableNode]'
})
export class DraggableNodeDirective implements OnInit {
  @Input() appDraggableNode: SimulationNodeDatum;
  @Input() draggableInGraph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.appDraggableNode, this.draggableInGraph);
  }
}
