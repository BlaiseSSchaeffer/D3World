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
    generation: number;
    parents: Person[];
    children: Person[];
    cssClass: string;


    constructor(
        firstName: string,
        lastName: string,
        gender: 'M' | 'F',
        dob: Date,
        dod: Date,
        generation: number,
        parents: Person[],
        children: Person[]) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = dob;
        this.dod = dod;
        this.generation = generation;
        this.parents = parents;
        this.children = children;

        this.id = firstName + lastName;

        switch (this.gender) {
            case 'M':
                this.cssClass = 'male';
                break;

            case 'F':
                this.cssClass = 'female';
                break;

            default:
                break;
        }
    }

}
