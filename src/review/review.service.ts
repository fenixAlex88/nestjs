import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDocument, ReviewModel } from './review.model';
import { InjectModel } from '@nestjs/mongoose';

class Leak {}

const leaks = [];

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewDocument>) {}

	async create(dto: CreateReviewDto): Promise<ReviewDocument> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<ReviewDocument | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<ReviewDocument[]> {
		leaks.push(new Leak());
		return this.reviewModel.find({ productId }).exec();
	}
}
