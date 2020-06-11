/* eslint-disable react/no-array-index-key */
import React from 'react';
// import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import styles from 'assets/jss/material-dashboard-react/components/tableStyle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles(styles as any);

interface CustomTableType {
  tableHead: string[];
  tableData: string[][];
  tableHeaderColor:'warning' | 'primary' | 'danger' |'success' |'info'|'rose'|'gray';
}


export default function CustomTable(props:CustomTableType) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[`${tableHeaderColor  }TableHeader`]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={`${classes.tableCell  } ${  classes.tableHeadCell}`}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((propin, key2) => {
                  return (
                    <TableCell className={classes.tableCell} key={key2}>
                      {propin}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
};

// CustomTable.propTypes = {
//   tableHeaderColor: PropTypes.oneOf([
//     'warning',
//     'primary',
//     'danger',
//     'success',
//     'info',
//     'rose',
//     'gray'
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
// };
