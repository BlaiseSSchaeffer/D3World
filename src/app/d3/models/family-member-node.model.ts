import { SimulationNodeDatum } from 'd3';
import { Person } from './person.model';

export class FamilyMemberNode implements SimulationNodeDatum {
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    id: string;

    firstName: string;
    lastName: string;
    gender: 'M' | 'F';
    dob: Date;
    dod: Date;
    parents: Person[];
    children: Person[];


    constructor(
        firstName: string,
        lastName: string,
        gender: 'M' | 'F',
        dob: Date,
        dod: Date,
        generation: number,
        parents: Person[],
        children: Person[]) {
        this.id = firstName + lastName;
    }

    getId() {
        if (!this.id) {
            return this.id = this.firstName + this.lastName;
        }
        return this.id;
    }

}
