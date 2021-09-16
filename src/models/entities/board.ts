import { ObjectId } from 'mongodb'
import { Account } from '@models/entities'

export interface Position {
    title: string;
    description: string;
    cnt?: number;
}

export interface Board {
	_id?: ObjectId;

	author: Account['_id'];
	kind: string;
	category: string;
	topic: string;
	title: string;
	content: string;
	positions: Position[]; // only contest
	wantCnt: number;
	applicationCnt?: number;
	acceptCnt?: number;
	startDate: Date;
	endDate: Date;
	isCompleted?: boolean;
	active: boolean;
	hit: number;
	updatedAt: Date;
}
