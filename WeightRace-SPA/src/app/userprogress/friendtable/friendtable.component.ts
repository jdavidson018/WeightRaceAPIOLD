import { Component, OnInit, Input } from '@angular/core';
import { Weight } from 'src/app/_models/weight';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-friendtable',
  templateUrl: './friendtable.component.html',
  styleUrls: ['./friendtable.component.css']
})
export class FriendtableComponent implements OnInit {
  @Input() user: User;
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
}

