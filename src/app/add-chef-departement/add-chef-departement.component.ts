import {Component, ElementRef, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-chef-departement',
  templateUrl: './add-chef-departement.component.html',
  styleUrls: ['./add-chef-departement.component.css']
})
export class AddChefDepartementComponent {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  AddChefDepartFormGroup: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    prenom: new FormControl("", [Validators.required]),
    cin: new FormControl("", [Validators.required]),
    cne: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    telephone: new FormControl("", [Validators.required]),
    adresse: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  generateAndLogPassword() {
    const password = this.generatePassword(8); // generate an 8-character password
    this.AddChefDepartFormGroup.controls['password'].setValue(password); // set the value of myControl in myForm to the value returned by getValue()
    console.log(password);
  }

  generatePassword(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randomIndex);
    }
    return password;
  }

}
