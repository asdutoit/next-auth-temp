import React from 'react';
import { classNames } from '../../../../utils/general';

export default function Input({
    name,
    defaultValue,
    errors,
    register,
    htmlId,
    type,
    required = true,
}) {
    return (
        <div>
            <label
                htmlFor={htmlId}
                className="block text-sm font-medium text-gray-700"
            >
                {name}
            </label>

            <input
                type={type}
                placeholder={name}
                name={htmlId}
                id={htmlId}
                defaultValue={defaultValue}
                className={classNames(
                    errors[name]?.type === 'required'
                        ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                        : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                    'mt-1 block w-full shadow-sm sm:text-sm border-gray-200 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 hover:bg-yellow-50 hover:border-yellow-400'
                )}
                {...register(name, {
                    required,
                    maxLength: 80,
                })}
            />
            {errors[name]?.type === 'required' ? (
                <span className="text-red-600 font-normal text-sm">
                    {name} is required
                </span>
            ) : null}
        </div>
    );
}
