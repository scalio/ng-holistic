import { App } from './app-table.models';

export const definition: App.Table.Defintion = {
    cols: [
        {
            id: 'customer',
            kind: 'CustomerName',
            title: 'Customer Name'
        },
        {
            id: 'order',
            kind: 'OrderNumber',
            title: 'Order Number'
        },
        {
            id: 'orderDate',
            title: 'Order Date',
            // bind: row => row.order.date,
            format: 'date'
        },
        {
            id: 'cardNumber',
            title: 'Card Number',
            kind: 'CardNumber'
        },
        {
            id: 'address',
            title: 'Address'
        },
        {
            id: 'amount',
            title: 'Amount'
        },
        {
            id: 'currency',
            title: 'Currency'
        }
    ]
};
