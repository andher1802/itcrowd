export class Movies {
  public id: number;
  public title: string;
  public releaseYear: number;
  public casting: string [];
  public directors: string [];
  public producers: string [];

  constructor(
    id: number,
    title: string,
    releaseYear: number,
    casting: string[] = [],
    producer: string[] = [],
    director: string[] = []
    ) {
    this.id = id;
    this.title = title;
    this.releaseYear = releaseYear;
    this.casting = casting;
    this.directors = producer;
    this.producers = director;
  }
}
