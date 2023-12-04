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
  }

export interface data {
  details: details,
  topics: topics[];
  assesment: assesment[];
}