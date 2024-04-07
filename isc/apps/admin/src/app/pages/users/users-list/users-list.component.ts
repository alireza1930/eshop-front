import {Component, OnInit} from "@angular/core"
import {CardModule} from "primeng/card"
import {ToolbarModule} from "primeng/toolbar"
import {ButtonModule} from "primeng/button"
import {TableModule} from "primeng/table"
import {Router, RouterModule} from "@angular/router"
import {ToastModule} from "primeng/toast"
import {ConfirmDialogModule} from "primeng/confirmdialog"
import {CommonModule} from "@angular/common"
import {ColorPickerModule} from "primeng/colorpicker";
import {TagModule} from "primeng/tag";
import {User} from "../../../../../../../users/src/lib/models/user";
import {UsersService} from "../../../../../../../users/src/lib/services/users.service";
import {ConfirmationService, MessageService} from "primeng/api";

const UX_MODULE = [CardModule, ToolbarModule, ButtonModule, TableModule, RouterModule, ToastModule,
  ConfirmDialogModule, CommonModule]

@Component({
  selector: "isc-users-list",
  standalone: true,
  imports: [UX_MODULE, ColorPickerModule, TagModule],
  templateUrl: "./users-list.component.html",
  styles: ``
})

export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(private usersService: UsersService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: "Do you want to Delete this User?",
      header: "Delete User",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this._getUsers()
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "User is deleted!"
            })
          },
          () => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "User is not deleted!"
            })
          }
        )
      }
    })
  }

  updateUser(id: string) {
    this.router.navigateByUrl(`users/form/${id}`);
  }

  /*getCountryName(countryKey: string){
    if (countryKey) return this.usersService.getCountry(countryKey);
  }*/

  private _getUsers() {
    this.usersService.getUsers().subscribe(result => {
      this.users = result;
    })
  }
}
