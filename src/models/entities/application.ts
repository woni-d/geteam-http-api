import { ObjectId } from 'mongodb'
import {
    Account,
    Board
} from '@models/entities'

export interface ContestApplication {
    position?: string; // only contest
    portfolio?: string; // link. only contest
    portfolioText?: string; // only contest
}

export interface Application {
    _id: ObjectId;

    applicant: Account['_id'];
    boardId: Board['_id'];
    author: Account['_id'];
    position: ContestApplication['position'];
    portfolio: ContestApplication['portfolio'];
    portfolioText: ContestApplication['portfolioText'];
    wantedText: string;
    isAccepted: boolean;
    acceptedAt: Date;
    active: boolean;
    
    createdAt: Date;
    updatedAt: Date;
}
