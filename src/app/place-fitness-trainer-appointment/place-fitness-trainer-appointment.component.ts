import { Component, OnInit} from '@angular/core';
import {  FormGroup,FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { UserService} from '../_services'
import { ActivatedRoute, Router } from '@angular/router';



export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  fitnessForm:FormGroup;
  updateStatus:Boolean = false;

  
  
  constructor(private fb:FormBuilder,private userService:UserService,private activeRoute:ActivatedRoute,private route:Router) { }
  

  ngOnInit() {
    this.fitnessForm = this.fb.group({
      id:[''],
      firstname:['',[Validators.required,Validators.pattern(`[A-zÀ-ú\s]+`)]],
      lastname:['',[Validators.required,Validators.pattern(`[A-zÀ-ú\s]+`)]],
      age:['',[Validators.required,this.ageRangeValidator]],
      phonenumber:['',[Validators.required,Validators.pattern(`[0-9]\\d{9}`)]],
      email:['',[Validators.required,Validators.pattern(`[^ @]*@[^ @]*`)]],
      streetaddress:['',[Validators.required]],
      city:['',[Validators.required,Validators.pattern(`[A-zÀ-ú\s]+`)]],
      state:['',[Validators.required,Validators.pattern(`[A-zÀ-ú\s]+`)]],
      country:['',[Validators.required,Validators.pattern(`[A-zÀ-ú\s]+`)]],
      pincode:['',[Validators.required,Validators.pattern(`[0-9]\\d{5}`)]],
      trainerpreference:['',Validators.required],
      package:['',Validators.required],
      inr:['',Validators.required,Validators.pattern[`[0-9]`]],
      paisa:['',Validators.required,Validators.pattern['[0-9]']]
    });
    
     this.allocatePackageCharges();
     this.populateFields();

  }


  allocatePackageCharges(){
    this.fitnessForm.get('package').valueChanges.subscribe(value =>{
      switch (value) {
        case "50":
          this.fitnessForm.patchValue({inr:5000,paisa:30});
          break;

        case "120":
          this.fitnessForm.patchValue({inr:7000,paisa:60});
          break;

        case "200":
            this.fitnessForm.patchValue({inr:9000,paisa:50});
            break; 

        default:
          break;
      }
    })
  }


  populateFields(){
    this.activeRoute.queryParams.subscribe(params => {
      if(params['id']){
        this.userService.getAppointmentById(params['id']).subscribe(response => {       
        this.fitnessForm.patchValue(response);
        },err => {
          alert("something went wrong");
        })
      }else{
        this.fitnessForm.reset();
      }
    });   

  }


  onSubmit() {
    console.log(this.fitnessForm.value);
    if(this.fitnessForm.valid){
      this.userService.postfitnessdata(this.fitnessForm.value).subscribe(response => {
      alert("Appointment added");
      this.fitnessForm.reset();
    },
        err => alert("something went wrong..try again"));
    }else{
      alert("Please fill the required fields with appropriate data.");
    
    }
  }
  

  updateDetails(){
    if(this.fitnessForm.valid){
      this.activeRoute.queryParams.subscribe(params =>{
        if(params['id']){
          this.userService.updateAppointmentDetails(params['id'],this.fitnessForm.value).subscribe(response =>{
            alert('changes updated');
            this.route.navigateByUrl('view-appointment');
          },err=>{
          alert('something went wrong..try again');
          });  
        }
      });
    }else{
      alert("Please fill the required fields with appropriate data.");
      
    }    
  }

  get f(){
    return this.fitnessForm.controls;
  }

  ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value < 18 || control.value > 60) {
        return { 'ageRange': true };
    }
    return null;
  }
     
}

