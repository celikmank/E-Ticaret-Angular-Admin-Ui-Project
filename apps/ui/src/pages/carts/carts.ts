import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, ViewEncapsulation } from '@angular/core';
import { Common } from '../../services/common';
import { cartModel } from '@e-ticaret/shared/models/cart.model'; 
import { TrCurrencyPipe } from 'tr-currency';


@Component({
  imports: [
    TrCurrencyPipe,
  ],
  templateUrl: './carts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Carts {
  readonly result = httpResource<cartModel[]>(() => {
    const endpoint = `api/carts?userId=${this.#common.user()!.id}`;
    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);

  // Pricing signals
  readonly taxRate = signal<number>(18);
  readonly shippingCost = signal<number>(0);

  readonly subtotal = computed(() => this.data().reduce((sum, item) => sum + (item.productPrice * (item.quantity ?? 1)), 0));
  readonly taxAmount = computed(() => Math.round(this.subtotal() * this.taxRate() / 100));
  readonly totalWithTax = computed(() => this.subtotal() + this.taxAmount() + this.shippingCost());
  

  readonly #common = inject(Common);
}