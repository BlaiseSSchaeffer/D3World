import { SimulationNodeDatum, Simulation, forceSimulation, forceCenter, forceManyBody } from 'd3';
// import { forceAttract } from 'd3-force-attract';
// import { forceCluster } from 'd3-force-cluster';
import { SvgOptions } from './svg-options.model';
import { Subject } from 'rxjs/Subject';

const FORCE = {
    CHARGE: 0,
    GRAVITY: 0.02,
    STRENGTH: 0.01
};

export class ForceDirectedCluster {
    public ticker = new Subject<Simulation<SimulationNodeDatum, undefined>>();
    public simulatiom: Simulation<any, undefined>;

    private nodes: SimulationNodeDatum[];

    constructor(
        nodes: SimulationNodeDatum[],
        svgOptoions: SvgOptions
    ) {
        this.nodes = nodes;
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

            this.simulatiom.force('gravity', forceManyBody()
                .strength(FORCE.GRAVITY));

            this.simulatiom.on('tick', function () {
                ticker.next(this);
            });

            this.initNodes();
        }

        this.simulatiom.force('center', forceCenter(svgOptoions.width / 2, svgOptoions.height / 2));
        this.simulatiom.restart();
    }

    initNodes() {
        this.isSimulationInitialized();
        this.simulatiom.nodes(this.nodes);
    }

    isSimulationInitialized() {
        if (!this.simulatiom) {
            throw new Error('Simulation has not been initialized');
        }
    }

}
