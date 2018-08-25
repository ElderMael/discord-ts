import {Article} from "./article";

export interface ApiNewsResponse {
    status: string;
    articles: Article[];
}