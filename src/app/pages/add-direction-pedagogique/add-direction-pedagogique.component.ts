import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-add-direction-pedagogique',
  templateUrl: './add-direction-pedagogique.component.html',
  styleUrls: ['./add-direction-pedagogique.component.css']
})
export class AddDirectionPedagogiqueComponent {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  AddDirectionFormGroup: FormGroup = new FormGroup({
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
    this.AddDirectionFormGroup.controls['password'].setValue(password); // set the value of myControl in myForm to the value returned by getValue()
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
