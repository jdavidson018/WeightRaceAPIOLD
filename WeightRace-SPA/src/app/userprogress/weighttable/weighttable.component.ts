import { Component, OnInit, Input } from '@angular/core';
import { Weight } from 'src/app/_models/weight';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-weighttable',
  templateUrl: './weighttable.component.html',
  styleUrls: ['./weighttable.component.css']
})
export class WeighttableComponent implements OnInit {
  @Input() weights: Weight[];
  @Input() userId: number;
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  delete(w: Weight) {
    this.userService.deleteWeight(this.userId, w.id).subscribe(() => {
    }, error => {
      this.alertify.error(error);
    }, () => {
      window.location.reload();
    });
  }

}
