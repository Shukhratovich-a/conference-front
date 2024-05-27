export interface IOrganizer {
  id: number;

  name: string;

  specialty: string;

  country: string;

  city?: string;

  role?: string;
}

export interface IOrganizerType {
  title: string;
  organizers: IOrganizer[];
}
