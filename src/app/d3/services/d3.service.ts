import { Injectable } from '@angular/core';
import { ForceDirectedGraph } from '../models/force-directed-graph.model';
import { SimulationNodeDatum, SimulationLinkDatum, select, event, zoom, drag } from 'd3';
import { SvgOptions } from '../models/svg-options.model';

@Injectable()
export class D3Service {
  private scaleExtent: [number, number] = [.25, 2];

  /** This service will provide methods to enable user interaction with elements
    * while maintaining d3 simulations physics
    */
  constructor() { }

  /** Bind pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    const svg = select(svgElement);
    const container = select(containerElement);

    const zoomed = () => {
      const transform = event.transform;
      container.attr('transform', transform);
    };

    const zoomBehaviour = zoom().scaleExtent(this.scaleExtent).on('zoom', zoomed);
    svg.call(zoomBehaviour);
  }

  /** Bind draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: SimulationNodeDatum, graph: ForceDirectedGraph) {
    const d3Element = select(element);

    const started = () => {
      event.sourceEvent.stopPropagation();

      if (!event.active) {
        graph.simulatiom.alphaTarget(0.3).restart();
      }

      const dragged = () => {
        node.fx = event.x;
        node.fy = event.y;
      };

      const ended = () => {
        if (!event.active) {
          graph.simulatiom.alphaTarget(0);
        }
      };

      event.on('drag', dragged)
        .on('end', ended);

    };

    d3Element.call(drag()
      .on('start', started));
  }

  /** No interact with the document, purely physical calculations with d3 */
  getForceDirectedGraph(nodes: SimulationNodeDatum[], links: SimulationLinkDatum<SimulationNodeDatum>[], svgOptions: SvgOptions) {
    const graph = new ForceDirectedGraph(nodes, links, svgOptions);
    return graph;
  }

}
