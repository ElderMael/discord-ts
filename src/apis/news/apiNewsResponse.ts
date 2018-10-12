import {Article} from "../../bin/article";

export interface ApiNewsResponse {
    status: string;
    articles: Article[];
}