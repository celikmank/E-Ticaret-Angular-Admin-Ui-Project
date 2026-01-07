import { Pipe, PipeTransform } from '@angular/core';
import { NavigationModel } from '@e-ticaret/shared/models/Navigation.model';

@Pipe({
    name: 'nav',
    standalone: true
})
export class NavPipe implements PipeTransform {
    transform(value: NavigationModel[], search: string): NavigationModel[] {
        return value.filter(nav => nav.title.toLocaleLowerCase().includes(search.toLowerCase()));
    }
}