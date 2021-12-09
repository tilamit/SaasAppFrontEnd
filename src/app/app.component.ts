import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from './Model/User';
import { Users } from './Model/Users';
import { UserService } from './Service/UserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SaasApp';
  formGroup;

  users: any[] = [];

  constructor(private formBuilder: FormBuilder, private userservice: UserService) {
    this.formGroup = this.formBuilder.group({
      name: '',
      email: '',
      address: '',
      userType: '',
      terms: false
    });
  }

  ngOnInit() {
    this.GetUsers();
  }

  changeStatus(id: number, userType: string, userName: string, dbName: string, event: any) {
    let obj = {} as Users;
    obj.DbName = dbName;
    obj.Name = userName;
    obj.Id = id;

    obj.UserStatus = event.target.checked;

    if (event.target.checked == true) {
      obj.UserType = "Paid";
    } else {
      obj.UserType = "Free Trial";
    }

    alert('Status changed successfully! Please wait to update.');
    console.log(obj);

    this.userservice.ChangeStaus(obj).subscribe(res => {
      console.log("Details", obj);

      this.GetUsers();
    });
  }

  GetUsers() {
    this.userservice.GetUsers().subscribe(result => {
      this.users = result;

      console.log(this.users);
    })
  }

  ConvertString(value: string) {
    return parseInt(value);
  }


  onSubmit(formData: any) {
    if ((this.formGroup.controls['name'].value == "") || (this.formGroup.controls['email'].value == "") || (this.formGroup.controls['address'].value == "") || (this.formGroup.controls['userType'].value == "")) {
      alert("Please! Fill up all required fields.");
    } else {

      var token = "";
      var name = formData['name'];
      var email = formData['email'];
      var address = formData['address'];
      var userType = formData['userType'];

      let obj = {} as User;
      obj.name = name;
      obj.email = email;
      obj.address = address;
      obj.userType = userType;

      if (userType == "Paid") {
        token = "12345678910";
      } else {
        token = "12345678912";
      }

      this.userservice.AddUser(token, obj).subscribe(res => {
        console.log("Details", obj);
      });

      alert('User added successfully! Please refresh web page.');
      this.GetUsers();
    }
  }
}