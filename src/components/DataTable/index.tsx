import * as React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {isScalar, ucWords} from '../../helpers/functions';

interface DataTableProps {
    data: Array<any>;
}

class DataTable extends React.Component<DataTableProps, any> {
    private columnNames: Array<string> = [];

    constructor(props: any) {
        super(props);
        this.columnNames = this.extractColumnNamesFromData(this.props.data);
    }

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {this.columnNames.map(
                            columnName => <TableCell
                                key={columnName}>{this.label(columnName)}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.data.map((row: any, index: number) => <TableRow key={String(index)}>
                        {this.columnNames.map(columnName => <TableCell key={columnName}>
                            {this.value(row[columnName])}</TableCell>)}
                    </TableRow>)}
                </TableBody>
            </Table>
        );
    }

    private extractColumnNamesFromData(data: Array<any>): Array<string> {
        let columnNames: Array<string> = [];
        for (let i in data[0]) {
            if (isScalar(data[0][i])) {
                columnNames.push(String(i));
            }
        }
        return columnNames;
    }

    private label(value: string): string {
        return ucWords(value.replace(/_/g, ' '));
    }

    private value(value: any): string {
        if (undefined === value || null === value) {
            return '';
        }

        return String(value);
    }
}

export default DataTable;
