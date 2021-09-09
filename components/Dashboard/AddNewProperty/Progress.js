import React, { memo } from 'react';
import { classNames } from '../../../utils/general';

function Progress({ steps, progress, setProgressStatus }) {
    return (
        <div className="w-72 mr-16">
            {steps.map((step, i) => (
                <div key={i}>
                    <div className="text-sm font-normal text-gray-700 p-3 flex items-center">
                        <div
                            className={classNames(
                                progress === step.status
                                    ? 'bg-yellow-400'
                                    : 'bg-gray-300',
                                'rounded-full h-7 w-7 flex items-center justify-center '
                            )}
                        ></div>
                        <div
                            className={classNames(
                                progress === step.status
                                    ? 'font-bold'
                                    : 'font-normal',
                                'ml-4 cursor-pointer'
                            )}
                            onClick={() => setProgressStatus(step.status)}
                        >
                            {step.name}
                        </div>
                    </div>
                    {step.line && (
                        <div className="border-l-2 border-gray-300 h-8 rounded-sm ml-6"></div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default memo(Progress);
