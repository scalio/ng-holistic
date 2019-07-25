import { Table as ClrTable } from '@ng-holistic/clr-list';

// Exetnds Table.Defintion from @ng-holistic/clr-list by adding to it new custom column types
// Use App.Table.Defintion inetrafce as our domain to define a list inside application
export namespace App {

    export namespace Table {

        // Define domain columns which could be used further in tables definitions
        export namespace Columns {

            export interface CustomerName extends ClrTable.MapColumns.MapColumn {
                kind: 'CustomerName';
            }

            export interface OrderNumber extends ClrTable.MapColumns.MapColumn {
                kind: 'OrderNumber';
            }

            export interface CardNumber extends ClrTable.MapColumns.MapColumn {
                kind: 'CardNumber';
            }

            export interface Amount extends ClrTable.MapColumns.MapColumn {
                kind: 'Amount';
            }

            export interface Currency extends ClrTable.MapColumns.MapColumn {
                kind: 'Currency';
            }

            export type TableColumn = CustomerName | OrderNumber | CardNumber | Amount | Currency; 

        }

        // Deinition now supports typechecking for all domain columns
        export interface Defintion extends ClrTable.Definition<Columns.TableColumn> {
        } 
    }
} 