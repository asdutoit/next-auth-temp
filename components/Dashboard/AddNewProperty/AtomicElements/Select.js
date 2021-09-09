import React from 'react';

export default function Select({ name, register, htmlId, defaultValue }) {
    return (
        <div>
            <div className="flex content-center p-3">
                <input
                    type="checkbox"
                    placeholder={name}
                    defaultChecked={defaultValue}
                    {...register(name)}
                    className="w-8 h-8 sm:w-4 sm:h-4 focus:ring-yellow-400 text-yellow-400 border-gray-300 rounded self-center"
                />
                <label
                    htmlFor={htmlId}
                    className="block text-sm font-medium text-gray-700 pl-3 self-center"
                >
                    {name}
                </label>
            </div>
        </div>
    );
}
