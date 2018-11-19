import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Weight } from '../../_models/weight';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-addweight',
  templateUrl: './addweight.component.html',
  styleUrls: ['./addweight.component.css']
})
export class AddweightComponent implements OnInit {
  @Output() updateGraph = new EventEmitter();
  weight: Weight;
  addWeightForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authService: AuthService, private userService: UserService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createAddWeightForm();
  }
  createAddWeightForm() {
    this.addWeightForm = this.fb.group({
      value: ['', Validators.required],
      date: [null, Validators.required],
    }, {validator: this.passwordMatchValidator});
  }

  // custom validator
  passwordMatchValidator(g: FormGroup) {
  }

  update() {
    this.weight = Object.assign({}, this.addWeightForm.value);
    this.updateGraph.emit(this.weight);
  }

  addweight() {
    if (this.addWeightForm.valid) {
      this.weight = Object.assign({}, this.addWeightForm.value);
      this.userService.addWeight(this.authService.decodedToken.nameid, this.weight).subscribe(() => {
      }, error => {
        this.alertify.error(error);
      }, () => {
        window.location.reload();
      });
    }
  }
}
