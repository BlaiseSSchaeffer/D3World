import { SimulationLinkDatum } from 'd3';
import { FamilyMemberNode } from './family-member-node.model';

export class FamilyMemberLink implements SimulationLinkDatum<FamilyMemberNode> {
    source: FamilyMemberNode | string | number;
    target: FamilyMemberNode | string | number;
    index?: number;

    constructor(
        source: FamilyMemberNode | string | number,
        target: FamilyMemberNode | string | number
    ) {
        this.source = source;
        this.target = target;
    }

}
