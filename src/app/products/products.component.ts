import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  pageTitle = 'Lista de Productos';
  showImage = false;

  _listFilter: string;
  filteredProducts: IProduct[];

  products: IProduct[];
  errorMessage: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.perfomFilter(this.listFilter) : this.products;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Lista de Productos: ' + message;
  }

  perfomFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  constructor(private productService: ProductService) {
    this.filteredProducts = this.products;
   }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }

}
