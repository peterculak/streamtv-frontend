import * as React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import {isScalar, ucWords} from '../../helpers/functions';

// @todo pass styles through props and use props interface
interface DataTableProps {
    data: Array<any>;
    styles: {
        table: any,
        row: any,
    }
}

const styles = (theme: Theme) => createStyles({
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        fontSize: 14,
        fontWeight: 'normal',
    },
}))(TableCell);

// type ClassNames = { classes: { table: any, row: any } };

class DataTable extends React.Component<any, any> {
    private headers: Array<string> = [];

    render() {
        for (let i in this.props.data[0]) {
            if (isScalar(this.props.data[0][i])) {
                this.headers.push(String(i));
            }
        }
        return (
            <Table className={this.props.classes.table}>
                <TableHead>
                    <TableRow>
                        {this.headers.map(
                            header => <CustomTableCell key={header}>{this.tableCellHeader(header)}</CustomTableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.data.map((row: any) => <TableRow className={this.props.classes.row}
                                                                 key={String(row.id)}
                    >
                        {this.headers.map(header => <TableCell key={header}>
                            {this.tableCellValue(row[header])}</TableCell>)}
                    </TableRow>)}
                </TableBody>
            </Table>
        );
    }

    private tableCellHeader(value: string): string {
        return ucWords(value.replace(/_/g, ' '));
    }

    private tableCellValue(value: any): string {
        if (undefined === value || null === value) {
            return '';
        }

        return String(value);
    }
}

export default withStyles(styles)(DataTable);
