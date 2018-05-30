import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { D3Service } from '../services/d3.service';

@Directive({
  selector: '[appZoomable]'
})
export class ZoomableDirective implements OnInit {
  @Input() appZoomable: ElementRef;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyZoomableBehaviour(this.appZoomable, this._element.nativeElement);
  }

}
