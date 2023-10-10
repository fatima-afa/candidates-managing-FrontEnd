import { Component } from '@angular/core';

interface currentUser {
  role: string;
  name: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  currentUser: currentUser = {
    role: "candidat",
    name: "Fatima AFA"
  };


}
