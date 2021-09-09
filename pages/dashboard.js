import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import DashboardNavigation from '../components/Navigation/DashboardNavigation';
import AddProperty from '../components/Dashboard/AddNewProperty/AddProperty';
import Profile from '../components/Dashboard/Profile/index';
import Properties from '../components/Dashboard/Properties/index';

/* This example requires Tailwind CSS v2.0+ */
const people = [
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Durbanville, Cape Town',
        department: '6 Somme Street, Kraaifontein, 7550',
        role: '20Mbps Down | 10Mbps Up',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
];

const profile = [
    { name: 'Profile', href: '/#', current: false },
    {
        name: 'Add New Property',
        href: '/#',
        current: false,
    },
    {
        name: 'Properties',
        href: '/#',
        current: false,
    },
];

const returnComponent = (navoption, props) => {
    switch (navoption) {
        case 'Profile':
            return <Profile {...props} />;
        case 'Add New Property':
            return <AddProperty {...props} />;
        case 'Properties':
            return <Properties {...props} />;
        default:
            return null;
    }
};

export default function Dashboard() {
    const router = useRouter();
    const [session, loading] = useSession();
    const [navoption, setnavoption] = useState('Add New Property');
    const [component, setComponent] = useState(<AddProperty />);

    if (loading) <h1>Loading....</h1>;

    if (session === null) {
        router.push('/auth/signin');
    }
    const color = 'light';

    useEffect(() => {
        const componentToRender = returnComponent(navoption);
        setComponent(componentToRender);
    }, [navoption]);

    return session ? (
        <div className=" bg-FAFA">
            <div className="h-14 flex justify-center bg-white">
                <div className="flex max-w-screen-xl">
                    <DashboardNavigation
                        setnavoption={setnavoption}
                        profile={profile}
                        navoption={navoption}
                    />
                </div>
            </div>

            <div className="flex justify-center">{component}</div>
        </div>
    ) : null;
}

// <div className="h-full mx-12 px-4 py-12" id="profile">
// <div className="flex flex-col ">
//     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
//             <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg shadow-xl mb-12">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50 flex flex-col">
//                         <tr className="flex w-full">
//                             <th
//                                 scope="col"
//                                 className="w-4/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                             >
//                                 Name
//                             </th>
//                             <th
//                                 scope="col"
//                                 className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                             >
//                                 Title
//                             </th>
//                             <th
//                                 scope="col"
//                                 className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                             >
//                                 Status
//                             </th>
//                             <th
//                                 scope="col"
//                                 className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                             >
//                                 Role
//                             </th>
//                             <th
//                                 scope="col"
//                                 className="w-1/12 relative px-6 py-3"
//                             >
//                                 <span className="sr-only">
//                                     Edit
//                                 </span>
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody
//                         className="bg-white divide-y divide-gray-200 flex flex-col overflow-y-scroll"
//                         style={{
//                             height: '65vh',
//                         }}
//                     >
//                         {people.map((person) => (
//                             <tr
//                                 key={person.email}
//                                 className="flex w-full"
//                             >
//                                 <td className="w-4/12 px-6 py-4 whitespace-nowrap">
//                                     <div className="flex items-center">
//                                         <div className="flex-shrink-0 h-10 w-10">
//                                             <img
//                                                 className="h-10 w-10 rounded-full"
//                                                 src={person.image}
//                                                 alt=""
//                                             />
//                                         </div>
//                                         <div className="ml-4">
//                                             <div className="text-sm font-medium text-gray-900">
//                                                 {person.name}
//                                             </div>
//                                             <div className="text-sm text-gray-500">
//                                                 {person.email}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td className="w-3/12 px-6 py-4 whitespace-nowrap">
//                                     <div className="text-sm text-gray-900">
//                                         {person.title}
//                                     </div>
//                                     <div className="text-sm text-gray-500">
//                                         {person.department}
//                                     </div>
//                                 </td>
//                                 <td className="w-1/12 px-6 py-4 whitespace-nowrap">
//                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                         Active
//                                     </span>
//                                 </td>
//                                 <td className="w-3/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     {person.role}
//                                 </td>
//                                 <td className="w-1/12 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                     <a
//                                         href="#"
//                                         className="text-indigo-600 hover:text-indigo-900"
//                                     >
//                                         Edit
//                                     </a>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                     <tfoot className="bg-gray-50">
//                         <div className="bg-white px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6">
//                             <div className="flex-1 flex justify-between sm:hidden">
//                                 <a
//                                     href="#"
//                                     className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                                 >
//                                     Previous
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                                 >
//                                     Next
//                                 </a>
//                             </div>
//                             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                                 <div>
//                                     <p className="text-sm text-gray-700">
//                                         Showing{' '}
//                                         <span className="font-medium">
//                                             1
//                                         </span>{' '}
//                                         to{' '}
//                                         <span className="font-medium">
//                                             10
//                                         </span>{' '}
//                                         of{' '}
//                                         <span className="font-medium">
//                                             97
//                                         </span>{' '}
//                                         results
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <nav
//                                         className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                                         aria-label="Pagination"
//                                     >
//                                         <a
//                                             href="#"
//                                             className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                                         >
//                                             <span className="sr-only">
//                                                 Previous
//                                             </span>
//                                             <ChevronLeftIcon
//                                                 className="h-5 w-5"
//                                                 aria-hidden="true"
//                                             />
//                                         </a>
//                                         {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
//                                         <a
//                                             href="#"
//                                             aria-current="page"
//                                             className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
//                                         >
//                                             1
//                                         </a>
//                                         <a
//                                             href="#"
//                                             className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
//                                         >
//                                             2
//                                         </a>
//                                         <a
//                                             href="#"
//                                             className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
//                                         >
//                                             3
//                                         </a>
//                                         <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
//                                             ...
//                                         </span>
//                                         <a
//                                             href="#"
//                                             className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
//                                         >
//                                             8
//                                         </a>
//                                         <a
//                                             href="#"
//                                             className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
//                                         >
//                                             9
//                                         </a>
//                                         <a
//                                             href="#"
//                                             className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
//                                         >
//                                             10
//                                         </a>
//                                         <a
//                                             href="#"
//                                             className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                                         >
//                                             <span className="sr-only">
//                                                 Next
//                                             </span>
//                                             <ChevronRightIcon
//                                                 className="h-5 w-5"
//                                                 aria-hidden="true"
//                                             />
//                                         </a>
//                                     </nav>
//                                 </div>
//                             </div>
//                         </div>
//                     </tfoot>
//                 </table>
//             </div>
//         </div>
//     </div>
// </div>
// </div>
