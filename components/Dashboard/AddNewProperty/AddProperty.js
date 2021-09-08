import React, { useState } from 'react';
import Progress from './Progress';
import AddPropertyForm from './AddPropertyForm';

const steps = [
    {
        name: 'Add Property Details',
        line: true,
        status: 'addpropdetails',
        component: <AddPropertyForm />,
    },
    {
        name: 'Media',
        line: true,
        status: 'media',
        // component: <AddMedia />,
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

export default function AddProperty() {
    const [progressStatus, setProgressStatus] = useState('addpropdetails');

    return (
        <>
            <div className="ml-36 mr-36 mt-8 max-w-screen-xl flex flex-row">
                <Progress
                    steps={steps}
                    progress={progressStatus}
                    setProgressStatus={setProgressStatus}
                />
                <div className="bg-white w-full pt-3 pl-5 pr-5 rounded-md shadow">
                    {steps.map(
                        (step) =>
                            progressStatus === step.status && step.component
                    )}
                </div>
            </div>
        </>
    );
}
