import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { Weight } from 'src/app/_models/weight';

@Component({
  selector: 'app-twousergraph',
  templateUrl: './twousergraph.component.html',
  styleUrls: ['./twousergraph.component.css']
})
export class TwousergraphComponent implements OnInit {

  user: User;
  weights: Weight[];
  friend: User;
  public lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        id: 'user-x-axis',
        type: 'time'
      }]
    }
  };

  public lineChartType = 'line';
  public lineChartLegend = true;

  public lineChartData: any[] = [];
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.weights = data['weights'];
      this.friend = data['friend'];
    });
    this.setupLineChart();
  }

  setupLineChart(): void {
    const userData: any[] = [];
    const friendData: any[] = [];
    this.weights.forEach(element => {
      userData.push({
        t: element.date,
        y: element.value
      });
    });
    this.friend.weights.forEach(element => {
      friendData.push({
        t: element.date,
        y: element.value
      });
    });
    this.lineChartData = [{data: userData, label: this.user.knownAs, xAxisId: 'user-x-axis'},
                          {data: friendData, label: this.friend.knownAs, xAxisId: 'user-x-axis'}];
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
