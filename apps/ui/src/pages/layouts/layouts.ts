import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CategoryModel } from '@e-ticaret/shared/models/Category.model';
import { Common } from '../../services/common';

@Component({
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Layouts {
  readonly result = httpResource<CategoryModel[]>(() => "api/categories");
  readonly data = computed(() => this.result.value() ?? []);
  readonly user = computed(() => this.#common.user());
  readonly cartCount = computed(() => this.#common.cartCount());

  readonly #router = inject(Router);
  readonly #common = inject(Common);

  logout() {
    localStorage.clear();
    this.#common.user.set(undefined);
    this.#common.cartCount.set(0);
    this.#router.navigateByUrl("/auth/login");
  }
}