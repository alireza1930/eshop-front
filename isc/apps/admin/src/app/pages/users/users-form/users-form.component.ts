import {Component, OnInit} from "@angular/core"
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms"
import {ToolbarModule} from "primeng/toolbar"
import {ButtonModule} from "primeng/button"
import {CardModule} from "primeng/card"
import {InputTextModule} from "primeng/inputtext"
import {CommonModule, Location} from "@angular/common"
import {ActivatedRoute, Router, RouterModule} from "@angular/router"
import {ToastModule} from "primeng/toast"
import {ColorPickerModule} from "primeng/colorpicker"
import {InputSwitchModule} from "primeng/inputswitch"
import {InputNumberModule} from "primeng/inputnumber"
import {InputTextareaModule} from "primeng/inputtextarea"
import {EditorModule} from "primeng/editor"
import {DropdownModule} from "primeng/dropdown"
import {MessageService} from "primeng/api"
import {timer} from "rxjs"
import {UsersService} from "../../../../../../../users/src/lib/services/users.service";
import {User} from "../../../../../../../users/src/lib/models/user";
import {InputMaskModule} from "primeng/inputmask";
//import * as countriesLib from 'i18n-iso-countries';

//declare const require: any;

@Component({
  selector: "isc-users-form",
  standalone: true,
  imports: [ToolbarModule, ButtonModule, CardModule, InputTextModule, CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule, ToastModule, ColorPickerModule, InputSwitchModule, InputNumberModule, InputTextareaModule, EditorModule,
    DropdownModule, InputMaskModule
  ],
  templateUrl: "./users-form.component.html",
  styles: ``
})
export class UsersFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId!: string;
  countries: any[] = [];

  constructor(private messageService: MessageService,
              private formBuilder: FormBuilder,
              private usersService: UsersService,
              private location: Location,
              private route: ActivatedRoute) {
    //countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,

      password: this.userForm.password.value
    };
    if (this.editmode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  ngOnInit(): void {
    this._initUserForm();
    //this._getCountries();
    this._checkEditMode();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

 /* private _getCountries() {
    this.countries = this.usersService.getCountries();
  }*/


  onCancle() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!'
        });
      }
    );
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }
}
