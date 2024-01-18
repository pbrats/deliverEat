import { Component,  OnInit,  inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniqueCategoryPipe } from "../../pipe/unique-category.pipe";
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../service/categories.service';
import { CategoriesPhotoService } from '../../service/categories-photo.service';


@Component({
    selector: 'app-categories',
    standalone: true,
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css',
    imports: [CommonModule, UniqueCategoryPipe]
})
export class CategoriesComponent implements OnInit{
  router: Router =inject(Router);
  activatedRoute =inject(ActivatedRoute);
  fCategories: any;
  // categories:any;
  // categories1:any;
  // categories2:any;
  // restaurantsService: RestaurantsService =inject(RestaurantsService);
  // famousService: FamousRestaurantsService =inject(FamousRestaurantsService);
  catService: CategoriesService =inject(CategoriesService);
  catPhotoService: CategoriesPhotoService =inject(CategoriesPhotoService);
  photosCategories: any;
  hasLoadedCategories : boolean= false;

  ngOnInit() {
    this.catService.getCategories().subscribe({
      next: data => {
      setTimeout(() =>{
    // (data) => {
      this.fCategories = data;
      this.hasLoadedCategories=true;
      },500);
    }
  });
    this.catPhotoService.getCategoriesPhotos().subscribe((data) => {
      this.photosCategories = data;
    });
    // get categories from stores
    // this.restaurantsService.getRestaurants()
    // .subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.categories1 =response;
    //   } 
    // });
    // get categories from mostFamouStores
    // this.famousService.getFamousRestaurants()
    // .subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.categories2 =response;
    // enonei catigories
    //     this.categories=this.categories1.concat(this.categories2)
    //     console.log(this.categories)
    //   } 
    // });
  }
  onCategoryClick(category: string) {
    this.router.navigate(["categories",category]);
  }
  constructor(private titleService: Title) {
    titleService.setTitle("Categories");
}
}
