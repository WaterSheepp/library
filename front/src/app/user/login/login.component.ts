import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { UserService} from '../../services/user.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  model = {
    user_name: '',
    password: ''
  }

  serverErrorMessage: string;

  ngOnInit(): void {

    if(this.userService.isLogedIn && this.userService.getUserRol() === 'admin' ){
      this.router.navigateByUrl('homePage');

    }else{
      if(this.userService.isLogedIn) {
        this.router.navigateByUrl('usHome')
      }
    }

  }

  onSubmit(){
    this.userService.login(this.model).subscribe(
      res => {

        this.userService.setToken(res['token']);
        this.userService.isLogedIn();
        var rol = this.userService.getUserRol();
        if(rol === 'admin') {

          this.router.navigateByUrl('homePage');


        }else{

          this.router.navigateByUrl('usHome');

        }
        
      },
      err => {

        this.serverErrorMessage = err.error.message;

      }
    );
  }
}
