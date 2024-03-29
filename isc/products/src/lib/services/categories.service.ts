import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Category } from "../models/category"
import { Observable } from "rxjs"
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }


  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(  environment.apiUrl + "categories");
  }

  createCategory(category: Category) : Observable<Category> {
    return this.http.post<Category>("http://localhost:3000/api/v1/categories/", category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/v1/categories/${categoryId}`);
  }

  getCategory(categoryId: string) : Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/api/v1/categories/${categoryId}`);
  }

  updateCategory(category: Category) : Observable<Category> {
    return this.http.put<Category>(`http://localhost:3000/api/v1/categories/${category._id}`, category);
  }
}
