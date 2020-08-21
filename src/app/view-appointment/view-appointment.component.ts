import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services'
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {
  private appointmentDetailsList:Object[];
  headerList = ["firstname",
    'streetaddress', 
    'city',
    'package',
    'trainerpreference',
    'phonenumber',
]

  constructor(private userService:UserService,private route:Router) { }

  

  ngOnInit() {
    this.getFitness();
    
  }
  
  getFitness() {
    this.userService.getfitnessdata().subscribe(response => {
      this.appointmentDetailsList = response;
    },err =>{
      console.log(err);
    })
    
  }

  edit(id){
    console.log(id);
    this.route.navigate(['/place-fitness-trainer-appointment'],{queryParams:{id:id}})
  }

  removeAppointment(id){
    this.userService.deleteAppointment(id).subscribe(response =>{
      this.getFitness();
    },err => {
      alert("something went wrong..")
    });
  }


}
