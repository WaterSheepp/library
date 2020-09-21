import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.userService.deleteToken();
    this.router.navigateByUrl("login");
  }

}
