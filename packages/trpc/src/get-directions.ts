import { convert } from "html-to-text"

type Location = {
    lat: number;
    lon: number;
}

export const getDirections = async (origin: Location, destination: Location) => {
    const result = await fetch(`https://maps.googleapis.com/maps/api/directions/json?destination=${destination.lat},${destination.lon}&origin=${origin.lat},${origin.lon}&key=AIzaSyBcqgkhWaJ4ALjLAxnpZjVzFnKZQOPz-7c`)
    const { routes } = await result.json();

    const firstRoute = routes[0];

    if (firstRoute === null) throw Error();

    const data = firstRoute.legs[0];

    const parsed_data = {
        distance: data.distance,
        duration: data.duration,
        start_addr: data.start_address,
        end_addr: data.end_addr,
        start_location: data.start_location,
        end_location: data.end_location,
        steps: data.steps.map((step: any) => ({
            distance: step.distance,
            duration: step.duration,
            start_location: {
                lat: step.start_location.lat,
                lon: step.start_location.lon
            },
            end_location: {
                lat: step.end_location.lat,
                lon: step.end_location.lon
            },
            text: convert(step.html_instructions)
        }))
    } as {
        distance: {
            text: string,
            value: number
        },
        duration: {
            text: string,
            value: number,
        }
        start_addr: string,
        end_addr: string,
        start_location: Location,
        end_location: Location,
        steps: {
            distance: {
                text: string,
                value: number 
            },
            duration: {
                text: string, 
                value: number
            },
            start_location: Location,
            end_location: Location,
            text: string
        }[]
    }

    return parsed_data;
}