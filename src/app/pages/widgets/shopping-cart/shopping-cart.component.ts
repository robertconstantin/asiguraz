import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/app/site.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private siteService: SiteService
  ) { }

  ngOnInit() { }

  removeSidebar() {
    this.siteService.removeSidebar();
  }

}
