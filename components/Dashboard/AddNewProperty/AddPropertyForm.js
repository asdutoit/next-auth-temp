import React, { useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from '../../../utils/general';
import Map from '../AddNewProperty/Map';
import Geocode from 'react-geocode';
import { usePlacesWidget } from 'react-google-autocomplete';
import { useStateMachine } from 'little-state-machine';
import { updateState } from './AddProperty';
import Dropdown from './AtomicElements/Dropdown';
import Input from './AtomicElements/Input';
import Select from './AtomicElements/Select';
import TextArea from './AtomicElements/TextArea';

const listingType = [
    { id: 1, name: 'For Sale' },
    { id: 2, name: 'To Rent' },
];

const propertyType = [
    { id: 1, name: 'House' },
    { id: 2, name: 'Townhouse' },
    { id: 3, name: 'Apartment' },
    { id: 4, name: 'Farm' },
    { id: 5, name: 'Plot' },
];

const newDevelopment = [
    { id: 1, name: 'False' },
    { id: 2, name: 'True' },
];

export default function AddPropertyForm({ setProgressStatus }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm();
    const { state, actions } = useStateMachine({ updateState });
    const [marker, setMarker] = useState(null);
    const mapRef = useRef();
    const mapsRef = useRef();
    const [stateaddress, setStateaddress] = useState(
        state.PropertyDetails.address
    );

    const { ref: inputref } = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
        onPlaceSelected: (place) => {
            setValue('Address Latitude', place.geometry.location.lat());
            setValue('Address Longitude', place.geometry.location.lng());
            setValue('Address', place.formatted_address);
            setStateaddress(place.formatted_address);
            actions.updateState({
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
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

    const onSubmit = (data) => {
        console.log('data', data);
        actions.updateState({
            listingName: data['Listing Name'],
            listingType: data['Listing Type'],
            apt: data['Apartment / Suite'],
            propertyType: data['Property Type'],
            beds: parseFloat(data['Bedrooms']),
            baths: parseFloat(data['Bathrooms']),
            garages: parseFloat(data['Garages']),
            pool: data['Pool'],
            plotSize: parseFloat(data['Plot Size (sqm)']),
            garageSize: parseFloat(data['Garage Size (sqm)']),
            floorSize: parseFloat(data['Floor Size (sqm)']),
            price: parseFloat(data['Price']),
            description: data['Description'],
            yearBuilt: data['Year Built'],
            pets: data['Pets'],
            garden: data['Garden'],
            flatlet: data['Flatlet'],
        });
        setProgressStatus('media');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-6">
                {/* Listing Name */}
                <div className="col-span-12 sm:col-span-6 md:col-span-3">
                    <Input
                        name="Listing Name"
                        errors={errors}
                        htmlId="listing_name"
                        defaultValue={state.PropertyDetails.listingName}
                        register={register}
                        type="text"
                        required={true}
                    />
                </div>
                {/* New Development */}
                <div className="col-span-12 sm:col-span-6 md:col-span-3">
                    <Dropdown
                        register={register}
                        errors={errors}
                        data={newDevelopment}
                        setValue={setValue}
                        name="New Development"
                    />
                </div>
                {/* Listing Type */}
                <div className="col-span-12 sm:col-span-6 md:col-span-3">
                    <Dropdown
                        register={register}
                        errors={errors}
                        data={listingType}
                        setValue={setValue}
                        name="Listing Type"
                    />
                </div>
                {/* Property Type */}
                <div className="col-span-12 sm:col-span-6 md:col-span-3">
                    <Dropdown
                        register={register}
                        errors={errors}
                        data={propertyType}
                        setValue={setValue}
                        name="Property Type"
                    />
                </div>
                {/* Address */}
                <div className="col-span-12 md:col-span-6">
                    <label
                        htmlFor="Address"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Address{' '}
                        <span className="text-xs text-gray-500">
                            (Or pin on map)
                        </span>
                    </label>
                    <input
                        type="text"
                        value={stateaddress}
                        onChange={(e) => setStateaddress(e.target.value)}
                        className={classNames(
                            errors['Address']?.type === 'required'
                                ? 'border-red-600 ring-red-600 focus:ring-red-600 focus:border-red-600 border-1 '
                                : 'focus:ring-yellow-400 focus:border-yellow-400 ',
                            'mt-1 block w-full shadow-sm sm:text-sm border-gray-200 rounded-sm bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400 hover:bg-yellow-50 hover:border-yellow-400'
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
                        className="mt-1 focus:ring-yellow-400 focus:border-yellow-400 block w-full shadow-sm sm:text-sm border-gray-200 rounded-sm bg-gray-50 hover:bg-yellow-50 hover:border-yellow-400"
                        placeholder="Address"
                        name="Address"
                        defaultValue={stateaddress}
                        {...register('Address', { required: true })}
                    />
                </div>
                {/* Address Coordinates - Latitude */}
                <div className="col-span-12 sm:col-span-6 md:col-span-3">
                    <Input
                        name="Address Latitude"
                        htmlId="address_longitude"
                        errors={errors}
                        defaultValue={state.PropertyDetails.lat}
                        register={register}
                        type="number"
                        required={true}
                    />
                </div>
                {/* Address Coordinates - Longitude */}
                <div className="col-span-12 sm:col-span-6 md:col-span-3">
                    <Input
                        name="Address Longitude"
                        htmlId="address_longitude"
                        errors={errors}
                        defaultValue={state.PropertyDetails.lng}
                        register={register}
                        type="number"
                        required={true}
                    />
                </div>
                {/* Map */}
                <div className="col-span-12 md:col-span-6 rounded-sm shadow-sm border-gray-200 border h-96 md:h-full">
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
                {/* Features Section */}
                <div className="col-span-12 md:col-span-6 grid grid-cols-6 gap-6 md:grid-cols-12">
                    {/* Apartment Suite */}
                    <div className="col-span-6 sm:col-span-6 md:col-span-12">
                        <Input
                            name="Apartment / Suite"
                            htmlId="address_apartment"
                            errors={errors}
                            defaultValue={state.PropertyDetails.apt}
                            register={register}
                            type="text"
                        />
                    </div>
                    {/* Bedrooms */}
                    <div className="col-span-6 md:col-span-6">
                        <Input
                            name="Bedrooms"
                            htmlId="features_bedrooms"
                            errors={errors}
                            defaultValue={state.PropertyDetails.beds}
                            register={register}
                            type="number"
                        />
                    </div>
                    {/* Bathrooms */}
                    <div className="col-span-6 md:col-span-6">
                        <Input
                            name="Bathrooms"
                            htmlId="features_bathrooms"
                            errors={errors}
                            defaultValue={state.PropertyDetails.baths}
                            register={register}
                            type="number"
                        />
                    </div>
                    {/* Garages */}
                    <div className="col-span-6 md:col-span-6">
                        <Input
                            name="Garages"
                            htmlId="features_garages"
                            errors={errors}
                            defaultValue={state.PropertyDetails.garages}
                            register={register}
                            type="number"
                        />
                    </div>
                    <div className="col-span-6 md:col-span-6">
                        <Input
                            name="Year Built"
                            errors={errors}
                            htmlId="year_built"
                            defaultValue={state.PropertyDetails.yearBuilt}
                            register={register}
                            type="number"
                        />
                    </div>
                    {/* Features */}
                    <div className="col-span-6 sm:col-span-6 md:col-span-12">
                        <div className="grid grid-cols-6 lg:flex lg:justify-between lg:items-center flex-wrap">
                            <div className="col-span-3">
                                <Select
                                    name="Pool"
                                    register={register}
                                    htmlId="pool"
                                    defaultValue={state.PropertyDetails.pool}
                                />
                            </div>
                            <div className="col-span-3">
                                <Select
                                    name="Pets"
                                    register={register}
                                    htmlId="pets"
                                    defaultValue={state.PropertyDetails.pets}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="col-span-3">
                                <Select
                                    name="Garden"
                                    register={register}
                                    htmlId="garden"
                                    defaultValue={state.PropertyDetails.garden}
                                />
                            </div>
                            <div className="col-span-3">
                                <Select
                                    name="Flatlet"
                                    register={register}
                                    htmlId="flatlet"
                                    defaultValue={state.PropertyDetails.flatlet}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Plot Size */}
                    <div className="col-span-6 lg:col-span-4">
                        <Input
                            name="Plot Size (sqm)"
                            errors={errors}
                            htmlId="plot_size"
                            defaultValue={state.PropertyDetails.plotSize}
                            register={register}
                            type="number"
                        />
                    </div>
                    {/* Garage Size */}
                    <div className="col-span-6 lg:col-span-4">
                        <Input
                            name="Garage Size (sqm)"
                            errors={errors}
                            htmlId="garage_size"
                            defaultValue={state.PropertyDetails.garageSize}
                            register={register}
                            type="number"
                        />
                    </div>
                    {/* Floor Size */}
                    <div className="col-span-6 lg:col-span-4">
                        <Input
                            name="Floor Size (sqm)"
                            errors={errors}
                            htmlId="floor_size"
                            defaultValue={state.PropertyDetails.plotSize}
                            register={register}
                            type="number"
                        />
                    </div>
                    {/* Price */}
                    <div className="col-span-6">
                        <Input
                            name="Price"
                            errors={errors}
                            htmlId="price"
                            defaultValue={state.PropertyDetails.price}
                            register={register}
                            type="number"
                        />
                    </div>
                    {/* Description */}
                    <div className="col-span-6 sm:col-span-6 md:col-span-12">
                        <TextArea
                            name="Description"
                            register={register}
                            htmlId="description"
                            errors={errors}
                            required={true}
                            defaultValue={state.PropertyDetails.description}
                        />
                    </div>
                </div>
            </div>
            {/* Navigation Buttons */}
            <div className="w-full h-16 flex items-center justify-between">
                <button
                    className="bg-gray-100 p-1 pl-2 pr-2 rounded-md text-gray-500 w-24"
                    disabled
                >
                    Previous
                </button>
                <button
                    className="bg-yellow-100 p-1 pl-2 pr-2 rounded-md text-yellow-500 w-24"
                    // onClick={handleNext}
                    type="submit"
                >
                    Next
                </button>
            </div>
        </form>
    );
}
