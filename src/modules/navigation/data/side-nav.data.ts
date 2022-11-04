import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'INTERFACE',
        items: ['layouts', 'receiving', 'stock'],
    },
    // {
    //     text: 'ADDONS',
    //     items: ['charts', 'tables'],
    // },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    layouts: {
        icon: 'columns',
        text: 'Indent',
        submenu: [
            {
                text: 'Add New Indent',
                link: '/dashboard/addIndent',
            },
            {
                text: 'Verify Indent',
                link: '/dashboard/verifyIndent',
            },
            
        ],
    },
   receiving: {
        icon: 'columns',
        text: 'Receiving',
        submenu: [
            {
                text: 'Add New Receiving',
                link: '/dashboard/addReceiving',
            },
            {
                text: 'View Receiving',
                link: '/dashboard/viewReceiving',
            },
        ],
    },
    stock: {
        icon: 'columns',
        text: 'Stock',
        submenu: [
            {
                text: 'View Stock ',
                link: '/dashboard/viewStock',
            },
            {
                text: 'Add Stock',
                link: '/dashboard/addStock',
            },
            {
                text: 'Remove Stock',
                link: '/dashboard/removeStock',
            },
        ],
    },
    // pages: {
    //     icon: 'book-open',
    //     text: 'Pages',
    //     submenu: [
    //         {
    //             text: 'Authentication',
    //             submenu: [
    //                 {
    //                     text: 'Login',
    //                     link: '/auth/login',
    //                 },
    //                 {
    //                     text: 'Register',
    //                     link: '/auth/register',
    //                 },
    //                 {
    //                     text: 'Forgot Password',
    //                     link: '/auth/forgot-password',
    //                 },
    //             ],
    //         },
    //         {
    //             text: 'Error',
    //             submenu: [
    //                 {
    //                     text: '401 Page',
    //                     link: '/error/401',
    //                 },
    //                 {
    //                     text: '404 Page',
    //                     link: '/error/404',
    //                 },
    //                 {
    //                     text: '500 Page',
    //                     link: '/error/500',
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // charts: {
    //     icon: 'chart-area',
    //     text: 'Charts',
    //     link: '/charts',
    // },
    // tables: {
    //     icon: 'table',
    //     text: 'Tables',
    //     link: '/tables',
    // },
};
