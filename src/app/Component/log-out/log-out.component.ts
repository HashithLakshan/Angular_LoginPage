import { Component } from '@angular/core';
import { Router } from '@angular/router';  // <-- Import Router for navigation
import Swal from 'sweetalert2';
import { UserService } from '../Service/user.service';
import { User } from 'src/app/shared/User';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {

  user: User = {
    userName: '',
    userId: '',
    firstName: '',
    lastName: '',
    contact: '',
    gender: '',
    email:''
  }
  user1 : User[]=[];


  constructor(private router: Router, private userService: UserService) {
    this.getuser();
  }

 
  

  onClicklogout() {
    // Remove session data
    sessionStorage.removeItem('sessionData');
    sessionStorage.removeItem('userName'); // Make sure you also remove 'userName' from the session

    Swal.fire('', 'Logged out successfully', 'success').then(() => {
      this.router.navigate(['/Login']);
    });
  }
  getSessionData() {
    const sessionData = sessionStorage.getItem('sessionData');
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    return null;
  }


  getuser(){
    const userName = sessionStorage.getItem('userName');  // Get the logged-in username from sessionStorage

    if (userName) {
      console.log('Fetching details for user: ' + userName);

      this.userService.getUser(userName).subscribe(
        (response) => {
          if (response && response.payload && response.payload.length > 0) {
            this.user = response.payload[0];  // Assuming payload[0] is an array of users

            console.log('User details fetched successfully:', this.user);
          } else {
            console.log('No user data found.');
          }
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.log('No user logged in.');
      // Optionally, redirect to login page if no session data exists
    }
    
  }
// Method to view a user’s details (in case you need to view another user)

  
}
