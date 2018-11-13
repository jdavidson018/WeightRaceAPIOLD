import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

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

  public lineChartLabels: string[] = [];
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

  public setupLineChart(): void {
    const data: any[] = [];
    this.user.weights.forEach(element => {
      data.push(element.value);
      this.lineChartData.push(element.value);
      this.lineChartLabels.push(element.id.toString());
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

    public addWeight() {
      this.alertify.success('Something happened');
    }

    public randomize(): void {
      // Only Change 3 values
      const data = [
        Math.round(Math.random() * 100),
        59,
        80,
        (Math.random() * 100),
        56,
        (Math.random() * 100),
        40];
      const clone = JSON.parse(JSON.stringify(this.lineChartData));
      clone[0].data = data;
      this.lineChartData = clone;
      /**
       * (My guess), for Angular to recognize the change in the dataset
       * it has to change the dataset variable directly,
       * so one way around it, is to clone the data, change it and then
       * assign it;
       */
    }

}
