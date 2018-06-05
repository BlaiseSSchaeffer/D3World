import { Component, OnInit, OnDestroy } from '@angular/core';
import { FamilyService } from '../services/family.service';
import { Subscription } from 'rxjs/Subscription';
import { FamilyMemberNode } from '../d3/models/family-member-node.model';
import { FamilyMemberLink } from '../d3/models/family-member-link.model';
import { D3Service } from '../d3/services/d3.service';
import { Person } from '../d3/models/person.model';
import { NodeService } from '../d3/services/node.service';

@Component({
  selector: 'app-family-visualization',
  templateUrl: './family-visualization.component.html',
  styleUrls: ['./family-visualization.component.scss'],
  providers: [
    FamilyService,
    D3Service,
    NodeService
  ]
})
export class FamilyVisualizationComponent implements OnInit, OnDestroy {
  private familyChangedSub = new Subscription();
  private familyLoadingSub = new Subscription();
  public familyLoading = true;

  public family: FamilyMemberNode[] = [];
  public familyLinks: FamilyMemberLink[] = [];
  public labelAccessor = 'firstName';
  public cssClassAccessor = 'cssClass';

  constructor(private familyService: FamilyService) { }

  ngOnInit() {
    this.familyLoadingSub = this.familyService.fetchingFamily.subscribe(
      (loading: boolean) => {
        this.familyLoading = loading;
      }
    );

    this.familyChangedSub = this.familyService.familyChanged.subscribe(
      (family: FamilyMemberNode[]) => {
        this.buildGraph(family);
        console.log('Family');
        console.log(this.family);
        console.log('Family Links');
        console.log(this.familyLinks);
      }
    );

    this.familyService.fetchFamily();
  }

  ngOnDestroy() {
    this.familyChangedSub.unsubscribe();
  }

  buildGraph(family: FamilyMemberNode[]) {
    this.constructNodes(family);

    let parent: FamilyMemberNode;
    let children: Person[];
    let parentFirstName: string;
    let child: Person;
    let childFirstName: string;
    let linkFound: FamilyMemberLink;
    let linkSource: FamilyMemberNode;
    let linkTarget: FamilyMemberNode;

    for (let i = 0; i < this.family.length; i++) {
      parent = this.family[i];
      children = parent.children;
      parentFirstName = parent.firstName;

      if (children && children.length !== 0) {
        for (let j = 0; j < children.length; j++) {
          child = children[j];
          childFirstName = child.firstName;

          linkFound = this.familyLinks.find(
            (link: FamilyMemberLink) => {
              linkSource = <FamilyMemberNode>link.source;
              linkTarget = <FamilyMemberNode>link.target;
              return (linkSource.firstName === parentFirstName && linkTarget.firstName === childFirstName)
                || (linkSource.firstName === childFirstName && linkTarget.firstName === parentFirstName);
            }
          );

          if (!linkFound) {
            this.familyLinks.push(new FamilyMemberLink(parentFirstName, childFirstName));
          }
        }
      }
    }

    this.findParents();
  }

  constructNodes(fetchedFamily: FamilyMemberNode[]) {
    const constructedFamily: FamilyMemberNode[] = [];
    let fetchedMember: FamilyMemberNode;
    let constructedMember: FamilyMemberNode;
    for (let i = 0; i < fetchedFamily.length; i++) {
      fetchedMember = fetchedFamily[i];
      constructedMember = new FamilyMemberNode(
        fetchedMember.firstName,
        fetchedMember.lastName,
        fetchedMember.gender,
        fetchedMember.dob,
        fetchedMember.dod,
        fetchedMember.generation,
        fetchedMember.parents,
        fetchedMember.children
      );
      constructedFamily.push(constructedMember);
    }
    this.family = constructedFamily;
  }

  findParents() {
    const familyLength = this.family.length;
    let member: FamilyMemberNode;
    let children: Person[];
    let child: Person;
    let otherMember: FamilyMemberNode;
    let otherChildren: Person[];
    let sameChildren: boolean;
    let childFound: Person;

    for (let i = 0; i < familyLength; i++) {
      member = this.family[i];
      children = member.children;
      for (let j = i + 1; j < familyLength; j++) {
        otherMember = this.family[j];
        otherChildren = otherMember.children;

        if (children && otherChildren
          && children.length !== 0 && otherChildren.length !== 0
          && children.length === otherChildren.length) {

          sameChildren = true;
          for (let l = 0; l < children.length; l++) {
            child = children[l];
            childFound = otherChildren.find(
              (c: Person) => {
                return child.firstName === c.firstName
                  && child.lastName === c.lastName;
              }
            );

            if (!childFound) {
              sameChildren = false;
              break;
            }
          }

          if (sameChildren) {
            this.familyLinks.push(new FamilyMemberLink(member.firstName, otherMember.firstName));
          }
        }
      }
    }
  }

}
