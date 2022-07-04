import React, { useEffect, useState } from 'react';
import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
  Table,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { isValidNetwork } from 'defi';
import _ from 'lodash';

import { HistoryData } from 'utils/types';
import { rawToFixed, getHistory, getShortString, openInNewTab } from 'utils';
import { CONTRACT_ADDRESSES } from 'defi/addresses';
import { NETWORKS } from 'defi/networks';

const Summary = () => {
  const [page, setPage] = useState(0);

  const { account, chainId } = useWeb3React();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [history, setHistory] = useState<Array<HistoryData>>([]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headCells = ['TxHash', 'BlockHash', 'Address', 'Amount', 'BlockNumber', 'TimeStamp'];
  const pageRowOptions = _.range(20, history.length, 5);

  useEffect(() => {
    const fetchAllData = async () => {
      const data = await getHistory(
        CONTRACT_ADDRESSES.uniswap_router.address,
        CONTRACT_ADDRESSES.uniswap_router.networkId
      );
      setHistory(data);
    };
    if (account && chainId && isValidNetwork(chainId)) {
      fetchAllData();
    } else {
      setHistory([]);
    }
  }, [account, chainId]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - history.length) : 0;

  return (
    <Box sx={{ width: '100%', mt: 10 }}>
      <Typography variant="h4" textAlign="center">
        History
      </Typography>
      <Paper sx={{ width: '100%', my: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <TableHead>
              <TableRow>
                {headCells.map((item, index) => (
                  <TableCell key={index}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={() => openInNewTab(`${NETWORKS[3].infoPageUrl}/tx/${row.hash}`)}>
                      {getShortString(row.hash)}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => openInNewTab(`${NETWORKS[3].infoPageUrl}/block/${row.blockHash}`)}>
                    {getShortString(row.blockHash)}
                  </TableCell>
                  <TableCell
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => openInNewTab(`${NETWORKS[3].infoPageUrl}/address/${row.from}`)}>
                    {getShortString(row.from)}
                  </TableCell>
                  <TableCell>{rawToFixed(row.value, 18).toFixed(3)}</TableCell>
                  <TableCell
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => openInNewTab(`${NETWORKS[3].infoPageUrl}/block/${row.blockNumber}`)}>
                    {row.blockNumber}
                  </TableCell>
                  <TableCell>{row.timestamp}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={pageRowOptions}
          component="div"
          count={history.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Summary;
