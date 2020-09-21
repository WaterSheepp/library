import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services';

@Component({
  selector: 'app-us-home',
  templateUrl: './us-home.component.html',
  styleUrls: ['./us-home.component.css']
})
export class UsHomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.userService.deleteToken();
    this.router.navigateByUrl("login");
  }


}
