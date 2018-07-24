import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { TuitsService } from "../../services/tuits.service";
import { Percent } from '../../models/percent';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-total-percent',
  templateUrl: './total-percent.component.html',
  styleUrls: ['./total-percent.component.css']
})
export class TotalPercentComponent implements OnInit{
  @ViewChild("containerPieChart") element: ElementRef;

  totalTuits: number;
  arrayOfPercents: Percent[] = [];
  private host: d3.Selection;
  private svg: d3.Selection;
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  private pieData = []
  constructor(private tuitsService: TuitsService) { }

  ngOnInit() {
    this.getValues();
  }

  getValues(): void {
    this.tuitsService.getTotalValues()
      .subscribe(values => {
        this.arrayOfPercents = values;
        this.arrayOfPercents.forEach(t => {
          if (t.label != 'total') {
            this.pieData.push(t)
          } else{
            this.totalTuits = t.total;
          }
        });
        this.htmlElement = this.element.nativeElement;
        this.host = d3.select(this.htmlElement);
        this.setup();
        this.buildSVG();
        this.buildPie();
      });
  }

  private setup(): void {
    this.width = 200;
    this.height = 200;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  private buildSVG(): void {
    this.host.html("");
    this.svg = this.host.append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
  }

  private buildPie(): void {
    let pie = d3.pie()
      .value(function(d) { return d.total; })
      .sort(null);
    let arcSelection = this.svg.selectAll(".arc")
      .data(pie(this.pieData))
      .enter()
      .append("g")
      .attr("class", "arc");

    this.populatePie(arcSelection);
  }

  private populatePie(arcSelection: d3.Selection<d3.pie.Arc>): void {
    let pieColorTexts = d3.scaleOrdinal()
      .range(['#EB675B','#36039C']);
    let arc = d3.arc<d3.pie.Arc>()
      .innerRadius(30)
      .outerRadius(this.radius);
    arcSelection.append("path")
      .attr("d", arc)
      .attr("fill", (datum, index) => datum.data.color);

    arcSelection.append("text")
      .attr("transform", (datum: any) => {
        datum.innerRadius = 0;
        datum.outerRadius = this.radius;
        return "translate(" + arc.centroid(datum) + ")";
      })
      .text((datum, index) => datum.data.total)
      .style("text-anchor", "middle")
      .attr("fill", (datum, index) => {
        return pieColorTexts(`${index}`);
      });
  }
}
