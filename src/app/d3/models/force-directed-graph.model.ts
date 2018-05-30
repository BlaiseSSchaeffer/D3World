import { Subject } from 'rxjs/Subject';
import { Simulation, SimulationNodeDatum, SimulationLinkDatum, forceSimulation, forceManyBody, forceCenter, forceLink } from 'd3';
import { FamilyMemberNode } from './family-member-node.model';
import { SvgOptions } from './svg-options.model';

const FORCE = {
    COLLISIONS: 1,
    CHARGE: -50,
    STRENGTH: 0
};

export class ForceDirectedGraph {
    public ticker = new Subject<Simulation<SimulationNodeDatum, SimulationLinkDatum<SimulationNodeDatum>>>();
    public simulatiom: Simulation<any, any>;

    private nodes: SimulationNodeDatum[];
    private links: SimulationLinkDatum<SimulationNodeDatum>[];

    constructor(
        nodes: SimulationNodeDatum[],
        links: SimulationLinkDatum<SimulationNodeDatum>[],
        svgOptoions: SvgOptions
    ) {
        this.nodes = nodes;
        this.links = links;

        this.initSimulation(svgOptoions);
    }

    initSimulation(svgOptoions: SvgOptions) {
        if (!svgOptoions || !svgOptoions.width || !svgOptoions.height) {
            throw new Error('Missing options during initialization of simulation');
        }

        if (!this.simulatiom) {
            const ticker = this.ticker;

            this.simulatiom = forceSimulation()
                .force('charge', forceManyBody()
                    .strength(FORCE.CHARGE));

            this.simulatiom.on('tick', function () {
                ticker.next(this);
            });

            this.initNodes();
            this.initLinks();
        }

        this.simulatiom.force('center', forceCenter(svgOptoions.width / 2, svgOptoions.height / 2));
        this.simulatiom.restart();
    }

    isSimulationInitialized() {
        if (!this.simulatiom) {
            throw new Error('Simulation has not been initialized');
        }
    }

    initNodes() {
        this.isSimulationInitialized();
        this.simulatiom.nodes(this.nodes);
    }

    initLinks() {
        this.isSimulationInitialized();
        this.simulatiom.force('links', forceLink(this.links)
            .id(
                (node: SimulationNodeDatum) => {
                    const familyNode = <FamilyMemberNode>node;
                    return familyNode.firstName;
                }
            )
            .strength(FORCE.STRENGTH)
        );
    }
}
