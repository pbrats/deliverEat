import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamousComponent } from '../famous/famous.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AllRestaurantsComponent } from '../all-restaurants/all-restaurants.component';
import { CategoriesComponent } from '../categories/categories.component';
import { FamousRestaurantsService } from '../../service/famous-restaurants.service';
import { RestaurantsService } from '../../service/restaurants.service';
import { UniqueCategoryPipe } from "../../pipe/unique-category.pipe";
import { Title } from '@angular/platform-browser';
import { CategoriesService } from '../../service/categories.service';
import { CategoriesPhotoService } from '../../service/categories-photo.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [CommonModule, FamousComponent, AllRestaurantsComponent, CategoriesComponent, UniqueCategoryPipe]
})
export class MainComponent {
  famousRestaurants: any;
  famousService: FamousRestaurantsService = inject(FamousRestaurantsService);
  // categories:any;
  // categories1:any;
  // categories2:any;
  fCategories: any;
  restaurants: any;
  restaurantsService: RestaurantsService = inject(RestaurantsService);
  catService: CategoriesService = inject(CategoriesService);
  catPhotoService: CategoriesPhotoService = inject(CategoriesPhotoService);
  photosCategories: any;
  hasLoadedCategories: boolean = false;
  hasLoadedFamous: boolean = false;
  showAlertFlag = false;
  User: any;
  // authService:AuthenticationService=inject(AuthenticationService)
  // shareDataService= inject(SharedDataService);
  // login:any;
  // isWelcomePage=false;
  // publisherService =inject(PublisherService);

  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute) {
    titleService.setTitle("Discovery");
    // this.isWelcomePage=false;
    // this.publisherService.publishData(this.isWelcomePage);
    // console.log(this.isWelcomePage);
    // this.router.events.subscribe((event) => console.log(event));
    // this.router.events.subscribe(event=>{
    //   if(event instanceof NavigationEnd){
    //     if (event.url.includes('discovery')){
    //       this.isWelcomePage=false;
    //       // this.publisherService.publishData({from: "landing-page", value: this.isWelcomePage});
    //       this.publisherService.publishData(this.isWelcomePage);
    //     }else{
    //       this.isWelcomePage=true;
    //       this.publisherService.publishData(this.isWelcomePage);
    //     }
    //   }
    // });
  }
  ngOnInit() {
    this.titleService.setTitle("Discovery");
    const reload = localStorage.getItem('reload');
    if (reload === 'no') {
      localStorage.setItem('reload', 'yes');
      // A WAY TO FIX THE PROBLEMATIC LOAD
      window.location.reload();
    }
    // this.route.queryParams.subscribe(params => {
    //   console.log(params)
    //   this.showAlertFlag = params['loginSuccess'];
    //   console.log(this.showAlertFlag);
    //   const hasAlertBeenShown = localStorage.getItem('alertShown');
    //   if (this.showAlertFlag && hasAlertBeenShown==='no') {
    //       this.showAlertFlag = false;
    //       this.router.navigate(["discovery"]);
    //       localStorage.setItem('alertShown', 'no'); 
    //   }
    // });
    // Retrieve the stored user information from local storage
    const storedUser = localStorage.getItem('User');
    // console.log( storedUser);
    if (storedUser) {
      // Parse the stored JSON string back into a JavaScript object
      this.User = JSON.parse(storedUser);
      // console.log(this.User);
      // Now, this.User contains the information of the authenticated user
      const hasAlertBeenShown = localStorage.getItem('alertShown');
      // console.log(hasAlertBeenShown);
      if (this.User && hasAlertBeenShown === 'no' && reload==='yes' ) {
        this.showAlertFlag = true;
        setTimeout(() => {
          this.showAlertFlag = false;
        }, 6000);
        // Set the flag in local storage to indicate that the alert has been shown
        localStorage.setItem('alertShown', 'yes');
      }
    } else {
      // Handle the case when no user information is stored in local storage
      console.log('No user information found in local storage');
      this.showAlertFlag = false;
    }
    // });
    // this.shareDataService.getData().subscribe(data => {
    //   this.login = data;
    //   console.log(this.login)
    //   console.log(this.login.email)
    //   console.log(this.login.password)
    //   console.log(this.showAlertFlag)
    //     setTimeout(() => {
    //       this.showAlertFlag = false;
    //         // window.location.reload();
    //     }, 5000); 
    // });
    // get categories from CategoriesService obj if so allazei sto html kai mpainei fCategories
    this.catService.getCategories().subscribe({
      next: data => {
        setTimeout(() => {
          // (data) => {
          this.fCategories = data;
          this.fCategories.forEach((cat: any) => {
            // console.log('Before replacement - category:', cat.category);
            cat.category = cat.category.replace(/_/g, ' ');
            // console.log('After replacement - category:', cat.category);
          });
          // console.log('After replacement:', this.fCategories);
          this.hasLoadedCategories = true;
        }, 1);
      }
    });
    this.restaurantsService.getRestaurants().subscribe((response) => {
      this.restaurants = response;
    });
    this.catPhotoService.getCategoriesPhotos().subscribe((response) => {
      this.photosCategories = response;
      this.photosCategories.forEach((photoCat: any) => {
        // console.log('Before replacement - category:', photoCat.category);
        photoCat.category = photoCat.category.replace(/_/g, ' ');
        // console.log('After replacement - category:', photoCat.category);
      });
      // console.log('After replacement:', this.photosCategories);
    });
    // get categories from restaurantsService
    // this.restaurantsService.getRestaurants()
    // .subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.categories1 =response;
    //   } 
    // });
    // get categories from famousRestaurantsService
    this.famousService.getFamousRestaurants()
      .subscribe({
        next: response => {
          setTimeout(() => {
            // console.log(response);
            this.famousRestaurants = response;
            this.famousRestaurants.forEach((famousRest: any) => {
              // console.log('Before replacement - category:', famousRest.category);
              famousRest.category = famousRest.category.replace(/_/g, ' ');
              // console.log('After replacement - category:', famousRest.category);
            });
            // console.log('After replacement:', this.famousRestaurants);
            this.hasLoadedFamous = true;
            // this.categories2 =response;
            // enonei categories if so allazei sto html kai mpainei categories
            // this.categories=this.categories1.concat(this.categories2)
          }, 1);
        }
      });
  }
  viewFamousRestaurants() {
    this.router.navigate(["famous-stores"]);
  }
  viewRestaurants() {
    this.router.navigate(["stores"]);
  }
  viewCategories() {
    this.router.navigate(["categories"]);
  }
  onCategoryClick(category: string) {
    this.router.navigate(["categories", category]);
  }
  onStoreClick(clickName: string) {
    const foundStore = this.restaurants.find((store: any) => store.name === clickName);
    // console.log(foundStore);
    if (foundStore) {
      this.router.navigate(["stores", clickName]);
    } else {
      this.router.navigate(["menu-not-found"]);
    }
  }
}