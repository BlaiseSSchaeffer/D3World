import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FamilyMemberNode } from '../models/family-member-node.model';
import { SimulationNodeDatum } from 'd3';

@Injectable()
export class NodeService {
  nodeSelected = new Subject<boolean>();
  selectedNode = new Subject<SimulationNodeDatum>();

  constructor() { }

}
