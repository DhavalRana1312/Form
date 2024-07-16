import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Form';
  formbuild=inject(FormBuilder);
studentForm:FormGroup=this.formbuild.group({
  name:['',[Validators.required]],
  email:['',[Validators.required,Validators.email]],
  age:[null],
  class:[null],
  address:[''],
  gender:['',[Validators.required]],
  isActive:[true]
})

httpService=inject(HttpService);
classes:any[]=[];
ngOnInit(){
  this.httpService.getClasses().subscribe((result:any)=>{
this.classes=result;
console.log(this.classes);
  })
}
saveStudent(){
  var formValues=this.studentForm.value;
  console.log("Form Saved",formValues);
  this.httpService.addStudent(formValues).subscribe(()=>
  {
    alert("Student details saved.");
  })
}
resetForm(){
  this.studentForm.reset();
}
}
