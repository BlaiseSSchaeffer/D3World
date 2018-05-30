import { Injectable } from '@angular/core';
import { FamilyMemberNode } from '../d3/models/family-member-node.model';
import { RestService } from './rest.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FamilyService {
  private family: FamilyMemberNode[] = [];
  public fetchingFamily = new Subject<boolean>();
  public familyChanged = new Subject<FamilyMemberNode[]>();

  constructor(private restService: RestService) { }

  fetchFamily() {
    this.fetchingFamily.next(true);
    this.restService.getFamily().subscribe(
      (family: FamilyMemberNode[]) => {
        this.family = family;
        this.emitFamily();
        this.fetchingFamily.next(false);
      }
    );
  }

  emitFamily() {
    this.familyChanged.next(this.family);
  }

}
