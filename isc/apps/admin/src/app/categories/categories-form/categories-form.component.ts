import {Component, OnInit} from "@angular/core"
import {ActivatedRoute, Router, RouterModule} from "@angular/router"
import {ToolbarModule} from "primeng/toolbar"
import {ButtonModule} from "primeng/button"
import {CardModule} from "primeng/card"
import {InputTextModule} from "primeng/inputtext"
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validator, Validators} from "@angular/forms"
import {CommonModule} from "@angular/common"
import {CategoriesService, Category} from "@isc/products"
import {ToastModule} from "primeng/toast"
import {MessageService} from "primeng/api"
import {ColorPickerModule} from "primeng/colorpicker";

@Component({
  selector: "isc-categories-form",
  standalone: true,
  imports: [ToolbarModule, ButtonModule, CardModule, InputTextModule, CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule, ToastModule, ColorPickerModule],
  templateUrl: "./categories-form.component.html",
  styles: ``
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup
  isSubmitted: boolean = false
  editMode = false;
  currentCategoryId! : string;

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      icon: ["", Validators.required],
      color: ["#fff"]
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.form.invalid) {
      return
    }

    const category: Category = {
      _id: this.currentCategoryId,
      name: this.categoryForm["name"].value,
      icon: this.categoryForm["icon"].value,
      color: this.categoryForm["color"].value
    }

    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }

  }

  get categoryForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        })
      }
    })
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(response => {
      this.messageService.add({severity: "success", summary: "Success", detail: "Category is created"})
      this.router.navigate(["/categories"])
    }, (error) => {
      this.messageService.add({severity: "error", summary: "Error", detail: "Category is not created"})
    })
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(response => {
      this.messageService.add({severity: "success", summary: "Success", detail: "Category is updated"})
      this.router.navigate(["/categories"])
    }, (error) => {
      this.messageService.add({severity: "error", summary: "Error", detail: "Category is not updated"})
    })
  }
}
