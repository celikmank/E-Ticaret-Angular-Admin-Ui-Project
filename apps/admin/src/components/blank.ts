import { ChangeDetectionStrategy, Component, effect, inject, input, ViewEncapsulation } from "@angular/core";
import { BreadcrumbModel } from "@e-ticaret/shared/models/Breadcrumb.model";
import { Common } from "../services/common";

@Component({
  selector: 'app-blank',
  template: `<title>E-ticaret Admin | {{pageTitle()}}</title>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export default class Blank {
  readonly pageTitle = input.required<string>();
  readonly breadcrumbs = input.required<BreadcrumbModel[]>();

  readonly #common = inject(Common);

  constructor() {
    effect(() => {
      this.#common.setBreadcrumb(this.breadcrumbs());
    });
  }
}