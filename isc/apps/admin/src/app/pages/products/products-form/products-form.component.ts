import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { CommonModule, Location } from "@angular/common"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { ToastModule } from "primeng/toast"
import { ColorPickerModule } from "primeng/colorpicker"
import { InputSwitchModule } from "primeng/inputswitch"
import { InputNumberModule } from "primeng/inputnumber"
import { InputTextareaModule } from "primeng/inputtextarea"
import { EditorModule } from "primeng/editor"
import { CategoriesService, Category, Product, ProductsService } from "@isc/products"
import { DropdownModule } from "primeng/dropdown"
import { MessageService } from "primeng/api"
import { timer } from "rxjs"

@Component({
  selector: "isc-products-form",
  standalone: true,
  imports: [ToolbarModule, ButtonModule, CardModule, InputTextModule, CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule, ToastModule, ColorPickerModule, InputSwitchModule, InputNumberModule, InputTextareaModule, EditorModule,
    DropdownModule
  ],
  templateUrl: "./products-form.component.html",
  styles: ``
})
export class ProductsFormComponent implements OnInit {
  editMode = false
  form!: FormGroup
  isSubmitted = false
  imageDisplay!: string | ArrayBuffer | null | undefined
  catagories: Category[] = []
  currentProductId!: string
  selectedCity: any

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private productsService: ProductsService,
              private messageService: MessageService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute) {
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.form.invalid)
      return

    const productFormData = new FormData()
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value)
    })
    if (this.editMode) {
      this._updateProduct(productFormData)
    } else {
      this._addProduct(productFormData)
    }
  }

  ngOnInit(): void {

    this._initForm()
    this._getCategories()
    this._checkEditMode()

  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      brand: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required],
      countInStock: ["", Validators.required],
      description: ["", Validators.required],
      richDescription: [""],
      image: ["", Validators.required],
      isFeatured: [false]
    })
  }

  get productForm() {
    return this.form.controls
  }


  onCancle() {

  }

  onImageUpload(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.form.patchValue({ image: file })
      this.form.get("image")!.updateValueAndValidity()
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(result => {
      this.catagories = result
    })
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Product is updated!"
        })
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back()
          })
      },
      () => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Product is not updated!"
        })
      }
    )
  }

  private _addProduct(productFormData: FormData) {
    this.productsService.createProduct(productFormData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: `Product ${product.name} is created!`
        })
        timer(2000)
          .toPromise()
          .then(() => {
            //this.router.navigate(["/categories"])
            this.location.back()
          })
      },
      () => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Product is not created!"
        })
      }
    )
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true
        this.currentProductId = params.id
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name)
          this.productForm.category.setValue(product.category?._id)
          this.productForm.brand.setValue(product.brand)
          this.productForm.price.setValue(product.price)
          this.productForm.countInStock.setValue(product.countInStock)
          this.productForm.isFeatured.setValue(product.isFeatured)
          this.productForm.description.setValue(product.description)
          this.productForm.richDescription.setValue(product.richDescription)
          this.imageDisplay = product.image
          this.productForm.image.setValidators([])
          this.productForm.image.updateValueAndValidity()
        })
      }
    })
  }
}
