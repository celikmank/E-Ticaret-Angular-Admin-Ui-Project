import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
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
    const endpoint = `api/baskets?userId=${this.#common.user()!.id}`;
    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);

  readonly #common = inject(Common);
}