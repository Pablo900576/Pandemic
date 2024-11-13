export interface Ciudad{
    name: string;
    region: number;
    coordinates: {
        x: number;
        y: number;
    };
    connectedCities: [];
    characters: [];
    diseaseCount: {
        green: number;
        red: number;
        blue: number;
        yellow: number;
    }
}

    