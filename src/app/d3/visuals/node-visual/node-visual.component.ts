import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SimulationNodeDatum } from 'd3';
import { Subscription } from 'rxjs/Subscription';
import { NodeService } from '../../services/node.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appNodeVisual]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent implements OnInit, OnDestroy {
  nodeSelectedSub: Subscription;
  @Input() appNodeVisual: SimulationNodeDatum;
  @Input() labelAccessor: string;
  @Input() radius = 5;
  @Input() cssClass = '';
  @Input() labelX = 0;
  @Input() labelY = 10;
  @Input() labelAlignmentBaseling = 'hanging';
  isSelected = false;

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.nodeSelectedSub = this.nodeService.nodeSelected.subscribe(
      (isSelected: boolean) => {
        this.isSelected = isSelected;
      }
    );
  }

  ngOnDestroy() {
    this.nodeSelectedSub.unsubscribe();
  }

  onClick() {
    console.log(this.appNodeVisual[this.labelAccessor]);
    this.nodeService.selectedNode.next(this.appNodeVisual);
    this.nodeService.nodeSelected.next(false);
    this.isSelected = true;
  }
}
