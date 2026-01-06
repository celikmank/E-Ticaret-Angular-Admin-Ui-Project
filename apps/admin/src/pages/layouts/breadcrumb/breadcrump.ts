import { Component, inject} from '@angular/core';
import { RouterLink } from "@angular/router";
import { Common } from '../../../services/common';

@Component({
  selector: 'app-breadcrump',
  standalone: true,
  templateUrl: './breadcrump.html',
  styleUrls: ['./breadcrump.css'],
  imports: [RouterLink],
})
export class Breadcrump {
  readonly #common = inject(Common);
  readonly data = this.#common.data;
}
