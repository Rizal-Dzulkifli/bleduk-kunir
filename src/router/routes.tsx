import { lazy } from 'react';
import { EndOfLineState } from 'typescript';
const Index = lazy(() => import('../pages/Analisis'));
const Finance = lazy(() => import('../pages/Dashboard'));
const Contacts = lazy(() => import('../pages/Apps/Kontak'));
const Scrumboard = lazy(() => import('../pages/Apps/Catatan'));
const Calendar = lazy(() => import('../pages/Apps/Calendar'));
const List = lazy(() => import('../pages/Apps/penjualan/List'));
const Preview = lazy(() => import('../pages/Apps/penjualan/Preview'));
const Add = lazy(() => import('../pages/Apps/penjualan/Add'));
const Edit = lazy(() => import('../pages/Apps/penjualan/Edit'));
const Listw = lazy(() => import('../pages/Apps/pengeluaran/List'));
const Previewe = lazy(() => import('../pages/Apps/pengeluaran/Preview'));
const Addw = lazy(() => import('../pages/Apps/pengeluaran/Add'));
const Editw = lazy(() => import('../pages/Apps/pengeluaran/Edit'));
const Listt = lazy(() => import('../pages/Apps/pembelian/List'));
const Previeww = lazy(() => import('../pages/Apps/pembelian/Preview'));
const Addd = lazy(() => import('../pages/Apps/pembelian/Add'));
const Editt = lazy(() => import('../pages/Apps/pembelian/Edit'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const Error = lazy(() => import('../components/Error'));
const routes = [
    {
        path: '/',
        element: <Finance />,
    },
    {
        path: '/analisis',
        element: <Index />,
    },
    {
        path: '/apps/contacts',
        element: <Contacts />,
    },
    {
        path: '/apps/penjualan/list',
        element: <List />,
    },
    {
        path: '/apps/pengeluaran/list',
        element: <Listw />,
    },
    {
        path: '/apps/pembelian/list',
        element: <Listt />,
    },
    {
        path: '/apps/scrumboard',
        element: <Scrumboard />,
    },
    {
        path: '/apps/calendar',
        element: <Calendar />,
    },
    {
        path: '/apps/penjualan/preview',
        element: <Preview />,
    },
    {
        path: '/apps/penjualan/add',
        element: <Add />,
    },
    {
        path: '/apps/penjualan/edit',
        element: <Edit />,
    },
    {
        path: '/apps/pembelian/preview',
        element: <Previeww />,
    },
    {
        path: '/apps/pembelian/add',
        element: <Addd />,
    },
    {
        path: '/apps/pembelian/edit',
        element: <Editt />,
    },

    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
