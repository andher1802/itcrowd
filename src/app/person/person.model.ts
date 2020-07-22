export class Person {
  public id: number;
  public firstName: string;
  public lastName: string;
  public moviesActor: string [];
  public moviesDirector: string [];
  public moviesProducer: string [];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    casting: string[] = [],
    producer: string[] = [],
    director: string[] = []
    ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.moviesActor = casting;
    this.moviesDirector = director;
    this.moviesProducer = producer;
  }
}
