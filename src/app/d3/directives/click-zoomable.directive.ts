import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { D3Service } from '../services/d3.service';

@Directive({
  selector: '[appClickZoomable]'
})
export class ClickZoomableDirective implements OnInit {
  @Input() clickZoomableInSvg: ElementRef;
  @Input() clickZoomableInContainer: ElementRef;

  constructor(
    private d3Service: D3Service,
    private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyClickZoomableBehavior(this._element.nativeElement,
      this.clickZoomableInSvg, this.clickZoomableInContainer);
  }

}
