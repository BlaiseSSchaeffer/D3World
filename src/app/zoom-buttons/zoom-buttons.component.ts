import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-zoom-buttons',
  templateUrl: './zoom-buttons.component.html',
  styleUrls: ['./zoom-buttons.component.scss']
})
export class ZoomButtonsComponent {
  @Input() clickZoomableInSvg: ElementRef;
  @Input() clickZoomableInContainer: ElementRef;

}
