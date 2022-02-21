import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router, public menuCtrl:MenuController) { }

  ngOnInit() {
  }
  //Method to navigate to the tabs page
  goToTabsPage(){
    this.router.navigate(['private/tabs/tab1']);
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }
  
}
