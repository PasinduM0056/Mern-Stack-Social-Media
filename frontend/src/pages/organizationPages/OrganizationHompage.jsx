import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Text,
  Button
} from "@chakra-ui/react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, Legend, CartesianGrid, XAxis, YAxis } from 'recharts';

// Dummy data for analytics
const dummyAnalyticsData = {
  users: 1000,
  sessions: 5000,
  pageViews: 15000,
};

// Sample data for charts
const sampleLineChartData = [
  { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 278, pv: 3908, amt: 2000 },
  { name: 'May', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 349, pv: 4300, amt: 2100 },
];

const sampleBarChartData = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 200 },
  { name: 'Apr', uv: 278 },
  { name: 'May', uv: 189 },
  { name: 'Jun', uv: 239 },
  { name: 'Jul', uv: 349 },
];

const samplePieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 200 },
  { name: 'Group D', value: 278 },
];

const OrganizationHompage = () => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure(true);

  useEffect(() => {
    // Simulating API call to fetch analytics data
    setTimeout(() => {
      setAnalyticsData(dummyAnalyticsData);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Flex width="calc(100vw - 240px)" justifyContent="flex-start">
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sidebar</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" alignItems="flex-start">
              <Text>Sidebar content goes here</Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box width="calc(100vw - 240px)">
        <Flex p={3} bg="blue.500" color="white" justify="space-between" align="center">
          <Button onClick={onOpen}>Open Sidebar</Button>
          <Heading>Analytics Dashboard</Heading>
          <Text>Profile</Text>
        </Flex>
        <Link to="/Update-Organization">
          <Button colorScheme="blue">Update Company Info</Button>
        </Link>

        <Link to="/Post-a-job">
          <Button colorScheme="blue">Post a Job</Button>
        </Link>

        <Link to="/Create-a-post">
          <Button colorScheme="blue">Create dedicated pages</Button>
        </Link>
        
        <Link to="/Candidate-Shortlisting">
          <Button colorScheme="blue">Candidates shortlisting</Button>
        </Link>
        <Link to="/Shortlisted-Candidates">
          <Button colorScheme="blue">Shortlisted candidates</Button>
        </Link>
        <Link to="/Posted-Jobs">
          <Button colorScheme="blue">Posted Jobs</Button>
        </Link>
        
        <Box>
          <Flex justify="space-around">
            <Stat>
              <StatLabel>Users</StatLabel>
              <StatNumber>{loading ? <Spinner size="sm" /> : analyticsData.users}</StatNumber>
              <StatHelpText>Total users on the platform</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Sessions</StatLabel>
              <StatNumber>{loading ? <Spinner size="sm" /> : analyticsData.sessions}</StatNumber>
              <StatHelpText>Total sessions on the platform</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Page Views</StatLabel>
              <StatNumber>{loading ? <Spinner size="sm" /> : analyticsData.pageViews}</StatNumber>
              <StatHelpText>Total page views</StatHelpText>
            </Stat>
          </Flex>

          <Heading mt={8} mb={4}>Charts</Heading>
          
          <Flex justify="space-around">
            <Box width="30%">
              <Heading size="md" mb={4}>Line Chart</Heading>
              <LineChart width={300} height={200} data={sampleLineChartData}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </Box>
            <Box width="30%">
              <Heading size="md" mb={4}>Bar Chart</Heading>
              <BarChart width={300} height={200} data={sampleBarChartData}>
                <Bar dataKey="uv" fill="#8884d8" />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </BarChart>
            </Box>
            <Box width="30%">
              <Heading size="md" mb={4}>Pie Chart</Heading>
              <PieChart width={300} height={200}>
                <Pie data={samplePieChartData} cx={150} cy={100} outerRadius={60} fill="#8884d8" label />
                <Tooltip />
              </PieChart>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default OrganizationHompage;




//OrganizationHompage