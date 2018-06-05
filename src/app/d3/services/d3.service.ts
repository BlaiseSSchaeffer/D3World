import { Injectable } from '@angular/core';
import { ForceDirectedGraph } from '../models/force-directed-graph.model';
import { SimulationNodeDatum, SimulationLinkDatum, select, event, zoom, drag } from 'd3';
import { SvgOptions } from '../models/svg-options.model';
import { ForceDirectedCluster } from '../models/force-directed-cluster.model';

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

  /** Binds zoomable behaviour to a button element
   *
   * Set button id='zoom-in' to zoom in
   *
   * Set button id='zoom-out' to zoom out
  */
  applyClickZoomableBehavior(buttonElement, svgElement, containerElement) {
    const button = select(buttonElement);
    const svg = select(svgElement);
    const container = select(containerElement);

    const zoomed = () => {
      const transform = event.transform;
      container.attr('transform', transform);
    };

    const zoomIt = zoom().scaleExtent(this.scaleExtent).on('zoom', zoomed);

    const id = buttonElement.id;
    if (id === 'zoom-in') {
      button.on('click', () => {
        zoomIt.scaleBy(svg, 1.2);
      });

    } else if (id === 'zoom-out') {
      button.on('click', () => {
        zoomIt.scaleBy(svg, 0.8);
      });
    }
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

  /** No interact with the document, purely physical calculations with d3 */
  getForceDirectedCluster(nodes: SimulationNodeDatum[], svgOptions: SvgOptions) {
    const cluster = new ForceDirectedCluster(nodes, svgOptions);
    return cluster;
  }
}
