import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { FamilyMemberNode } from '../d3/models/family-member-node.model';

@Injectable()
export class RestService {
  private familyEndpoint = '/api/family';

  private headers = new Headers(
    {
      'Content-Type': 'application/json'
    }
  );

  constructor(private http: Http) { }

  getFamily() {
    return this.http.get(this.familyEndpoint, { headers: this.headers }).map(
      (response: Response) => {
        const family: FamilyMemberNode[] = response.json();
        return family;
      }
    );
  }
}
