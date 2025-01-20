import { NeighborhoodPopulations } from '../../types/apis/neighborhood-population';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';

interface NeighborhoodInfoDrawerPopulactionSectionProps {
  items: NeighborhoodPopulations;
}

export const NeighborhoodInfoDrawerPopulactionSection = (props: NeighborhoodInfoDrawerPopulactionSectionProps) => {
  const { items } = props;

  const years = useMemo(() => {
    return items.map((item) => item.ano);
  }, [items]);

  const populationNumbers = useMemo(() => {
    return items.map((item) => item.populacao);
  }, [items]);

  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <Typography variant="h6" fontSize={16} fontWeight="bold">
        Population
      </Typography>

      <Box display="flex" flexDirection="column" gap="4px">
        <Typography variant="h6" fontSize={14} fontWeight="semi-bold" lineHeight="1.5">
          Data
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="right">Population</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.ano + row.id_geometria} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.ano}
                  </TableCell>
                  <TableCell align="right">{row.populacao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" flexDirection="column" gap="4px">
        <Typography variant="h6" fontSize={14} fontWeight="semi-bold" lineHeight="1.5">
          Graph
        </Typography>

        <LineChart
          xAxis={[
            {
              data: years,
              valueFormatter: (value) => value.toString(),
              label: 'Year',
            },
          ]}
          series={[
            {
              data: populationNumbers,
              area: true,
              label: 'Population',
            },
          ]}
          height={200}
        />
      </Box>
    </Box>
  );
};
