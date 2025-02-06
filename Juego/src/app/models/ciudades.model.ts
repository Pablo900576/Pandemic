export interface Ciudad {
    name: string;
    region: number;
    coordinates: {
        x: number;
        y: number;
    };
    brotes: {
        red: boolean,
        yellow: boolean,
        blue: boolean,
        green: boolean,
    }
    connectedCities: [];
    characters: [];
    diseaseCount: {
        green: number;
        red: number;
        blue: number;
        yellow: number;
    }
}

