import { Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { LoginComponent } from '../user/login/login.component';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../auth/auth.guard';
import { ManagementComponent } from '../management/management/management.component';
import { MbManagementComponent } from '../mb-management/mb-management.component';
import { UsHomeComponent } from '../us-home/us-home.component';
import { BooksDisplayComponent } from '../us-home/books-display/books-display.component';
import { from } from 'rxjs';

export const appRoutes: Routes = [
    {
        path: 'login', component: LoginComponent,
        children: [{path: '', component: UserComponent}]
    },

    {
        path: 'homePage', component: HomeComponent, canActivate: [AuthService]
    },
    {
        path:'', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'userManagement', component: ManagementComponent, canActivate: [AuthService]
    },
    {
        path: 'mbManagement', component: MbManagementComponent, canActivate: [AuthService]
    },
    {
        path: 'usHome', component: UsHomeComponent, canActivate: [AuthService]
    },
    {
        path: 'booksDisplay', component: BooksDisplayComponent, canActivate: [AuthService]
    },
];