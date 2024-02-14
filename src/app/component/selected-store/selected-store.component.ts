import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../service/restaurants.service';
import { Title } from '@angular/platform-browser';
import { MenuComponent } from '../menu/menu.component';
import { StoresInfosService } from '../../service/stores-infos.service';
import { RatingsComponent } from '../ratings/ratings.component';

@Component({
    selector: 'app-selected-store',
    standalone: true,
    templateUrl: './selected-store.component.html',
    styleUrl: './selected-store.component.css',
    imports: [CommonModule, MenuComponent, RatingsComponent]
})
export class SelectedStoreComponent {
  activatedRoute =inject(ActivatedRoute);
  selectedStore: string | undefined ;
  items: any[]=[];
  storesService: RestaurantsService =inject(RestaurantsService);
  storeInfosService: StoresInfosService =inject(StoresInfosService);
  storeInfos:any;
   
  constructor(private titleService: Title,private router: Router) {}
  ngOnInit(): void {   
    this.storeInfosService.getStoresInfos().subscribe((response) => {
      this.storeInfos = response;
    });
    this.activatedRoute.params.subscribe((params:any) => {
          console.log(params);
          this.selectedStore = params.name;
          console.log(this.selectedStore);
          this.titleService.setTitle(`${this.selectedStore}`);
          this.storesService.getRestaurants().subscribe((data:any) => {
            // Check if the selected store exists in the data
            const storeExists = data.some((store: any) => store.name === this.selectedStore);
            if (storeExists) {
              this.items = data.filter((item:any) => item.name === this.selectedStore);
              // console.log('Before replacement:', this.items);
              this.items.forEach((item: any) => {
                // console.log('Before replacement - category:', item.category);
                item.category = item.category.replace(/_/g, ' ');
                // console.log('After replacement - category:', item.category);
              });
              // console.log('After replacement:', this.items);
            } else {
              // Store does not exist, navigate to "menu-not-found"
              this.router.navigate(["menu-not-found"]);
            }
            // allos tropos na paei sto not found alla etsi den paei piso gt fortonei prota ti selida tou magaziou meta ti selida not found on loop
            // if(this.items.length==0){
            //   this.router.navigate(["menu-not-found"]);}
          }); 
    });
  }
}
