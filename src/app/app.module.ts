import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { RestService } from './services/rest.service';
import { GraphComponent } from './d3/visuals/graph/graph.component';
import { NodeVisualComponent } from './d3/visuals/node-visual/node-visual.component';
import { LinkVisualComponent } from './d3/visuals/link-visual/link-visual.component';
import { ZoomableDirective } from './d3/directives/zoomable.directive';
import { DraggableNodeDirective } from './d3/directives/draggable-node.directive';
import { FamilyVisualizationComponent } from './family-visualization/family-visualization.component';


@NgModule({
  declarations: [
    AppComponent,
    FamilyVisualizationComponent,
    GraphComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomableDirective,
    DraggableNodeDirective
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
