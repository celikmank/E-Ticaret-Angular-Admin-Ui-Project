import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { ProductModel } from '@e-ticaret/shared/models/Product.model';
import { RouterLink } from 'node_modules/@angular/router/types/_router_module-chunk';
import { TrCurrencyPipe} from 'tr-currency';

@Component({
  imports: [TrCurrencyPipe],
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html'
})
export class Products {
  readonly result = httpResource<ProductModel[]>(() => 'api/products');
  readonly data =computed(() => this.result.value() ?? []);
}
