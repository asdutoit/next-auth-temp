import React, { useState } from 'react';
import Progress from './Progress';
import AddPropertyForm from './AddPropertyForm';
import AddMedia from './AddMedia';
import {
    StateMachineProvider,
    createStore,
    useStateMachine,
} from 'little-state-machine';

createStore({
    PropertyDetails: {
        listingName: '',
        listingType: 'For Sale',
        address: '',
        lat: null,
        lng: null,
        apt: '',
        propertyType: 'House',
        beds: null,
        baths: null,
        garages: null,
        pool: 'No',
        plotSize: null,
        garageSize: null,
        houseSize: null,
        price: null,
        description: null,
    },
});

export function updateState(globalState, payload) {
    return {
        ...globalState,
        PropertyDetails: {
            ...globalState.PropertyDetails,
            ...payload,
        },
    };
}

export default function AddProperty() {
    const [progressStatus, setProgressStatus] = useState('addpropdetails');

    const steps = [
        {
            name: 'Add Property Details',
            line: true,
            status: 'addpropdetails',
            component: (
                <AddPropertyForm setProgressStatus={setProgressStatus} />
            ),
        },
        {
            name: 'Media',
            line: true,
            status: 'media',
            component: <AddMedia setProgressStatus={setProgressStatus} />,
        },
        {
            name: 'Payment',
            line: true,
            status: 'payment',
            // component: <AddPayment />,
        },
        {
            name: 'Review',
            line: true,
            status: 'review',
            // component: <ReviewListing />,
        },
        {
            name: 'Completed',
            line: false,
            status: 'completed',
            // component: <CompletedListing />,
        },
    ];

    return (
        <StateMachineProvider>
            <div className="ml-16 mr-16 mt-8 max-w-screen-xl flex flex-row">
                {/* <Progress
                    steps={steps}
                    progress={progressStatus}
                    setProgressStatus={setProgressStatus}
                /> */}
                <div className="bg-white w-full pt-3 pl-5 pr-5 rounded-md shadow">
                    {steps.map(
                        (step) =>
                            progressStatus === step.status && step.component
                    )}
                </div>
            </div>
        </StateMachineProvider>
    );
}
