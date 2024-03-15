import { Component, OnInit } from "@angular/core"
import { Router, RouterModule } from "@angular/router"
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validator, Validators } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { CategoriesService, Category } from "@isc/products"
import { ToastModule } from "primeng/toast"
import { MessageService } from "primeng/api"

@Component({
  selector: "isc-categories-form",
  standalone: true,
  imports: [ToolbarModule, ButtonModule, CardModule, InputTextModule, CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule, ToastModule],
  templateUrl: "./categories-form.component.html",
  styles: ``
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup
  isSubmitted: boolean = false

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private messageService: MessageService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      icon: ["", Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.form.invalid) {
      return
    }

    const category: Category = {
      name: this.categoryForm["name"].value,
      icon: this.categoryForm["icon"].value
    }
    this.categoriesService.createCategory(category).subscribe(response => {
      this.messageService.add({ severity: "success", summary: "Success", detail: "Category is created" })
      this.router.navigate(["/categories"])
    }, (error) => {
      this.messageService.add({ severity: "error", summary: "Error", detail: "Category is not created" })
    })
  }

  get categoryForm() {
    return this.form.controls;
  }
}
