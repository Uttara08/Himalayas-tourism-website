export type Tour = {
    id?: string;
    tourName?: string;
    image?: string;
    description?: string;
    rating: number;
    tourPrice?: number;
    categories?: Array<string>;
    details?: string;
    tourGuide?: string;
    weight? : string;
    dateOfTravel: string;
}