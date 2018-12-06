import * as React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {isScalar, ucWords} from '../../helpers/functions';
import {createStyled} from "../functions";
import StyledTableCell from './StyledTableCell';

interface DataTableProps {
    data: Array<any>;
}

class DataTable extends React.Component<DataTableProps & { classes?: any, styles?: any }, any> {
    private columnNames: Array<string> = [];

    constructor(props: any) {
        super(props);
        this.columnNames = this.extractColumnNamesFromData(this.props.data);
    }

    render() {
        return (
            <Table className={this.props.classes && this.props.classes.table ? this.props.classes.table : ''}>
                <TableHead>
                    <TableRow>
                        {this.columnNames.map(
                            columnName => <StyledTableCell styles={this.props.styles ? this.props.styles.headerCell : ''}
                                                           key={columnName}>{this.label(columnName)}</StyledTableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.data.map((row: any) => <TableRow
                        className={this.props.classes && this.props.classes.row ? this.props.classes.row : ''}
                        key={String(row.id)}
                    >
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

function RenderProps(parentProps: DataTableProps & { styles?: any }) {
    if (undefined !== parentProps.styles) {
        const Styled = createStyled(parentProps.styles);
        return (
            <Styled>{(props: any) => <DataTable {...parentProps} {...props}></DataTable>}</Styled>
        );
    }

    return (<DataTable {...parentProps}></DataTable>);
}

export default RenderProps;
