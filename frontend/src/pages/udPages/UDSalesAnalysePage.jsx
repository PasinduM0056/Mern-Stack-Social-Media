import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UDSideBar from "../../components/udComponents/UDSideBar";
import { Box } from '@chakra-ui/react';

const UDSalesAnalysePage = () => {
  // Sample sales data (replace with your actual sales data)
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 6000 },
    { name: 'May', sales: 8000 },
    { name: 'Jun', sales: 7000 },
    { name: 'Jul', sales: 9000 },
    { name: 'Aug', sales: 10000 },
    { name: 'Sep', sales: 11000 },
    { name: 'Oct', sales: 12000 },
    { name: 'Nov', sales: 10000 },
    { name: 'Dec', sales: 14000 },
  ];

  return (
    <Box>
      <Box paddingLeft="560px" paddingTop="100px"></Box>
      <UDSideBar />
      <Box paddingLeft="560px" paddingTop="100px">
      <div className="sales-chart">
        <h2>Sales Analysis</h2>
        <ResponsiveContainer width="90%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </Box>
    </Box>
   
  );
};

export default UDSalesAnalysePage;
