import * as React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {isScalar} from '../../helpers/functions';

interface DataTableProps {
  data: Array<any>;
}

export default function DataTable(props: DataTableProps) {
  const headers: Array<string> = [];

  for (let i in props.data[0]) {
    if (isScalar(props.data[0][i])) {
      headers.push(i);
    }
  }

  return (
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(
                header => <TableCell key={header}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => <TableRow
              key={String(row.id)}
          >
            {headers.map(header => <TableCell key={header}>
              {String(row[header])}</TableCell>)}
          </TableRow>)}
        </TableBody>
      </Table>
  );
};
