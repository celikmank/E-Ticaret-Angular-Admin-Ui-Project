import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login').then((m) => m.Login),
    },
    {
      path : "" ,
        loadComponent: () => 
            import ('./pages/layouts/layouts').then (m => m.layouts),
        children: [
            {    
                path: '',
                loadComponent: () =>
                    import('./pages/home/home').then((m) => m.Home),
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('./pages/products/products').then((m) => m.default)
            },
            {
                path: 'products/create',
                loadComponent: () =>
                    import('./pages/products/product-create/product-create').then((m) => m.default)
            },
        ],
    },
];
