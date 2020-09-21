import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './auth/auth.guard';
import { from } from 'rxjs';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { appRoutes } from './routes/routes'
import { FormsModule } from '@angular/forms'
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { UserManagementService } from './services/user-management.service';
import { ManagementComponent } from './management/management/management.component';
import { MbManagementComponent } from './mb-management/mb-management.component';
import { UsHomeComponent } from './us-home/us-home.component';
import { BooksDisplayComponent } from './us-home/books-display/books-display.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    ManagementComponent,
    MbManagementComponent,
    UsHomeComponent,
    BooksDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [UserService, UserManagementService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }


