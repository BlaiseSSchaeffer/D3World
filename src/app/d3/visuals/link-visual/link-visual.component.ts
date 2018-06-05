import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { Subscription } from 'rxjs/Subscription';
import { NodeService } from '../../services/node.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appLinkVisual]',
  templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.scss']
})
export class LinkVisualComponent implements OnInit, OnDestroy {
  selectedNodeSub: Subscription;
  @Input() appLinkVisual: SimulationLinkDatum<SimulationNodeDatum>;
  public source: SimulationNodeDatum;
  public target: SimulationNodeDatum;
  @Input() cssClass = '';

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    if (this.appLinkVisual) {
      this.source = <SimulationNodeDatum>this.appLinkVisual.source;
      this.target = <SimulationNodeDatum>this.appLinkVisual.target;
    }

    this.selectedNodeSub = this.nodeService.selectedNode.subscribe(
      (node: SimulationNodeDatum) => {
        if (this.appLinkVisual.source === node || this.appLinkVisual.target === node) {
          this.cssClass = 'link';
        } else {
          this.cssClass = 'link--light';
        }
      }
    );
  }

  ngOnDestroy() {
    this.selectedNodeSub.unsubscribe();
  }
}
