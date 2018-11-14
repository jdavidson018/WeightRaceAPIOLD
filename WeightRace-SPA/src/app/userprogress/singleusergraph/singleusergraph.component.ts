import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { componentRefresh } from '@angular/core/src/render3/instructions';
import { Weight } from 'src/app/_models/weight';

@Component({
  selector: 'app-singleusergraph',
  templateUrl: './singleusergraph.component.html',
  styleUrls: ['./singleusergraph.component.css']
})
export class SingleusergraphComponent implements OnInit {
  user: User;
  weightForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  public lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public lineChartLabels: any[] = [];
  public lineChartType = 'line';
  public lineChartLegend = true;

  public lineChartData: any[] = [
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'this.user.knownAs'}
  ];
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createWeightForm();
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.setupLineChart();
  }

  createWeightForm() {
    this.weightForm = this.fb.group({
      date: [null, Validators.required],
    });
  }

  setupLineChart(): void {
    const data: any[] = [];
    const labels: Date[] = [];
    this.user.weights.forEach(element => {
      data.push({
        y: element.value
      });
      this.lineChartLabels = [...this.lineChartLabels, element.date.toString()];
    });
    this.lineChartData = [{data, label: this.user.knownAs}];
    this.lineChartType = 'line';
    this.lineChartLegend = true;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public updateGraph(update: Weight): void {
    this.lineChartData[0].data = [...this.lineChartData[0].data, update.value];
    this.lineChartLabels = [...this.lineChartLabels, update.date.toString()];
  }

}
