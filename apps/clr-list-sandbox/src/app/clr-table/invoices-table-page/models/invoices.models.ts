export namespace Invoices {

    export interface Customer {
        id: number;
        name: string;
        avatar: string;
    }           

    export interface Order {
        id: string;
        image: string;
        date: string;
    }           

}