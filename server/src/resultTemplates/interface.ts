export type question = {
  question: string;
  status: string;
  note: string
}
export type questions = question[]

export type subtopics = Record<string, questions>;
export type topics = Record<string, subtopics[]>;
// type topics = subtopics[]
export type assesment = {
  assesment: string;
  rating: string;
}

export type details = {
    name: string;
    class: string;
    teacher: string;
    email: string;
    absent: string;
    signature: string;
  }

export interface data {
  details: details,
  topics: topics[];
  assesment: assesment[];
}

export type subject = {
  CA1: number;
  CA2: number;
  Proj: number;
  exam: number;
  average: string;
  comment: string
}

export type subjects = Record<string, subject>;
type specialArea = {
  behavior: String;
  effort: String;
  skill: String;

}
export type specialAreas = Record<string, specialArea>;
export type affectiveAssesment = {
  [key: string]: string;
}

export interface data2 {
  details: details;
  subjects: subjects;
  specailAreas: specialAreas;
  affectiveAssesment: affectiveAssesment;
}