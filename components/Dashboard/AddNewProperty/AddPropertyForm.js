import React, { useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from '../../../utils/general';
import Map from '../AddNewProperty/Map';
import Geocode from 'react-geocode';
import { usePlacesWidget } from 'react-google-autocomplete';

// function IsolateReRender({ control }) {
//     const address = useWatch({
//         control,
//         name: 'Address', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
//         defaultValue: '', // default value before the render
//     });
//     Geocode.fromAddress(address).then(
//         (response) => {
//             const { lat, lng } = response.results[0].geometry.location;
//             console.log(lat, lng);
//         },
//         (error) => {
//             console.error(error);
//         }
//     );
//     console.log(address);
//     return <div>{address}</div>; // only re-render at the component level, when firstName changes
// }

export default function AddPropertyForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        control,
    } = useForm();
    const onSubmit = (data) => console.log(data);
    const [marker, setMarker] = useState(null);
    const mapRef = useRef();
    const mapsRef = useRef();
    const [stateaddress, setStateaddress] = useState('');

    console.log('Errors: ', errors);

    const { ref: inputref } = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
        onPlaceSelected: (place) => {
            console.log(place);
            const stringarray = place.formatted_address.split(',');
            console.log(stringarray);
            setValue('Address Latitude', place.geometry.location.lat());
            setValue('Address Longitude', place.geometry.location.lng());
            setValue('Address', place.formatted_address);
            setMarker({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
            mapRef.current.setZoom(16);
            mapRef.current.panTo({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
        },
        options: {
            types: ['address'],
            componentRestrictions: { country: 'za' },
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6 sm:col-span-6">
                    <label
                        htmlFor="listing-name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Listing Name
                    </label>

                    <input
                        type="text"
                        placeholder="Listing Name"
                        name="listing-name"
                        id="listing-name"
                        className={classNames(
                            errors['Listing Name']?.type === 'required'
                                ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                            'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                        )}
                        {...register('Listing Name', {
                            required: true,
                            maxLength: 80,
                        })}
                    />
                    {errors['Listing Name']?.type === 'required' ? (
                        <span className="text-red-600 font-normal text-sm">
                            Listing name is required
                        </span>
                    ) : null}
                </div>
                <div className="col-span-6 sm:col-span-6">
                    <label
                        htmlFor="listing-name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Listing Type
                    </label>
                    <select
                        {...register('Listing Type', { required: true })}
                        className={classNames(
                            errors['Listing Type']?.type === 'required'
                                ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                            'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                        )}
                    >
                        <option value="For Sale">For Sale</option>
                        <option value=" For Rent">For Rent</option>
                    </select>
                    {errors['Listing Type']?.type === 'required' ? (
                        <span className="text-red-600 font-normal text-sm">
                            Listing Type is required
                        </span>
                    ) : null}
                </div>

                <div className="col-span-6 sm:col-span-6">
                    <label
                        htmlFor="Address"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Address{' '}
                        <span className="text-xs text-gray-500">
                            (If the address is not available, please pin on the
                            map)
                        </span>
                    </label>
                    <input
                        type="text"
                        value={stateaddress}
                        className={classNames(
                            errors['Address']?.type === 'required'
                                ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                            'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                        )}
                        placeholder="Address"
                        ref={inputref}
                    />
                    {errors['Address']?.type === 'required' ? (
                        <span className="text-red-600 font-normal text-sm">
                            Address is required
                        </span>
                    ) : null}
                    <input
                        type="hidden"
                        className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50"
                        placeholder="Address"
                        name="Address"
                        {...register('Address', { required: true })}
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor="address_latitude"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Address Latitude
                    </label>
                    <input
                        type="text"
                        placeholder="Address Latitude"
                        className={classNames(
                            errors['Address Latitude']?.type === 'required'
                                ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                            'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                        )}
                        {...register('Address Latitude', {
                            required: true,
                        })}
                    />
                    {errors['Address Latitude']?.type === 'required' ? (
                        <span className="text-red-600 font-normal text-sm">
                            Latitude is required
                        </span>
                    ) : null}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor="address_longitude"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Address Longitude
                    </label>
                    <input
                        type="text"
                        placeholder="Address Longitude"
                        className={classNames(
                            errors['Address Longitude']?.type === 'required'
                                ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                            'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                        )}
                        {...register('Address Longitude', { required: true })}
                    />
                    {errors['Address Longitude']?.type === 'required' ? (
                        <span className="text-red-600 font-normal text-sm">
                            Longitude is required
                        </span>
                    ) : null}
                </div>

                <div className="col-span-6 sm:col-span-6  grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="address_apartment"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Apartment / Suite
                        </label>
                        <input
                            type="text"
                            className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50"
                            placeholder="Apartment / Suite"
                            {...register('Apartment / Suite', {})}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="address_property_type"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Property Type
                        </label>
                        <select
                            {...register('Property Type', {
                                required: true,
                            })}
                            className={classNames(
                                errors['Property Type']?.type === 'required'
                                    ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                    : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                                'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                            )}
                        >
                            <option value="House">House</option>
                            <option value=" Apartment"> Apartment</option>
                            <option value=" Stand"> Stand</option>
                            <option value=" Farm"> Farm</option>
                        </select>
                        {errors['Property Type']?.type === 'required' ? (
                            <span className="text-red-600 font-normal text-sm">
                                Property Type is required
                            </span>
                        ) : null}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="features_bedrooms"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Bedrooms
                        </label>
                        <input
                            type="number"
                            placeholder="Bedrooms"
                            className={classNames(
                                errors['Bedrooms']?.type === 'required'
                                    ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                    : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                                'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                            )}
                            {...register('Bedrooms', { required: true })}
                        />
                        {errors['Bedrooms']?.type === 'required' ? (
                            <span className="text-red-600 font-normal text-sm">
                                Bedrooms is required
                            </span>
                        ) : null}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="features_bathrooms"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Bathrooms
                        </label>
                        <input
                            type="number"
                            placeholder="Bathrooms"
                            className={classNames(
                                errors['Bathrooms']?.type === 'required'
                                    ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                    : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                                'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                            )}
                            {...register('Bathrooms', { required: true })}
                        />
                        {errors['Bathrooms']?.type === 'required' ? (
                            <span className="text-red-600 font-normal text-sm">
                                Bathrooms is required
                            </span>
                        ) : null}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="features_garage"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Garages
                        </label>
                        <input
                            type="number"
                            placeholder="Garages"
                            className={classNames(
                                errors['Garages']?.type === 'required'
                                    ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                    : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                                'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                            )}
                            {...register('Garages', { required: true })}
                        />
                        {errors['Garages']?.type === 'required' ? (
                            <span className="text-red-600 font-normal text-sm">
                                Specify whether the property has any garages
                            </span>
                        ) : null}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="features_pool"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Pool
                        </label>
                        <div className="flex">
                            <input
                                {...register('Pool', { required: true })}
                                type="radio"
                                value="Yes"
                                className="focus:ring-yellow-400 h-4 w-4 text-yellow-400 border-gray-300"
                            />
                            <label
                                htmlFor="push-nothing"
                                className="ml-1 block text-sm font-medium text-gray-700 mr-6"
                            >
                                Yes
                            </label>
                            <input
                                {...register('Pool', { required: true })}
                                type="radio"
                                value="No"
                                className="focus:ring-yellow-400 h-4 w-4 text-yellow-400 border-gray-300"
                            />
                            <label
                                htmlFor="push-nothing"
                                className="ml-1 block text-sm font-medium text-gray-700 mr-6"
                            >
                                No
                            </label>
                        </div>
                        {errors['Pool']?.type === 'required' ? (
                            <span className="text-red-600 font-normal text-sm">
                                Specify whether the property has a pool
                            </span>
                        ) : null}
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                        <label
                            htmlFor="address_postal_code"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Plot Size
                        </label>
                        <input
                            type="number"
                            placeholder="sqm"
                            className={classNames(
                                errors['Plot Size (square meter)']?.type ===
                                    'required'
                                    ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                    : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                                'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                            )}
                            {...register('Plot Size (square meter)', {
                                required: true,
                            })}
                        />
                        {errors['Plot Size (square meter)']?.type ===
                        'required' ? (
                            <span className="text-red-600 font-normal text-sm">
                                Home Size is required
                            </span>
                        ) : null}
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                        <label
                            htmlFor="address_postal_code"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Garage Size
                        </label>
                        <input
                            type="number"
                            className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50"
                            placeholder="sqm"
                            {...register('Garage Size (square meter)', {})}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                        <label
                            htmlFor="address_postal_code"
                            className="block text-sm font-medium text-gray-700"
                        >
                            House Size
                        </label>
                        <input
                            type="number"
                            className={classNames(
                                errors['Home Size (square meter)']?.type ===
                                    'required'
                                    ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                    : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                                'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                            )}
                            placeholder="sqm"
                            {...register('Home Size (square meter)', {
                                required: true,
                            })}
                        />
                        {errors['Home Size (square meter)']?.type ===
                        'required' ? (
                            <span className="text-red-600 font-normal text-sm">
                                Home Size is required
                            </span>
                        ) : null}
                    </div>
                    <div className="col-span-6">
                        {' '}
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Price (R)
                        </label>
                        <input
                            type="number"
                            placeholder="Price"
                            className={classNames(
                                errors['Price']?.type === 'required'
                                    ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                    : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                                'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                            )}
                            {...register('Price', { required: true })}
                        />
                        {errors['Price']?.type === 'required' ? (
                            <span className="text-red-600 font-normal text-sm">
                                Price is required
                            </span>
                        ) : null}
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                        <label
                            htmlFor="Description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            className={classNames(
                                errors['Description']?.type === 'required'
                                    ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                    : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                                'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 '
                            )}
                            {...register('Description', { required: true })}
                        />
                        {errors['Description']?.type === 'required' ? (
                            <span className="text-red-600 font-normal text-sm">
                                A description is required
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-6 ">
                    <Map
                        price={watch('Price')}
                        marker={marker}
                        setMarker={setMarker}
                        mapRef={mapRef}
                        mapsRef={mapsRef}
                        setValue={setValue}
                        setStateaddress={setStateaddress}
                    />
                </div>
            </div>
            <div className="w-full h-16 flex items-center flex-row-reverse">
                <button
                    className="bg-yellow-100 p-1 pl-2 pr-2 rounded-md text-yellow-500 border-2 border-yellow-500"
                    type="submit"
                >
                    Next
                </button>
            </div>
        </form>
    );
}
