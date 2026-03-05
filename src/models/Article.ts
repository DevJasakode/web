import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
    NonAttribute,
    ForeignKey,
} from "sequelize";


export class ArticleMedia extends Model<
    InferAttributes<ArticleMedia>,
    InferCreationAttributes<ArticleMedia>
> {
    declare id: CreationOptional<number>;
 
    declare created_at: CreationOptional<number>;
    declare created_by: number;
};

export class ArticleComment extends Model<
    InferAttributes<ArticleComment>,
    InferCreationAttributes<ArticleComment>
> {
    declare id: CreationOptional<number>;
 
    declare created_at: CreationOptional<number>;
    declare created_by: number;
};

export class ArticleLike extends Model<
    InferAttributes<ArticleLike>,
    InferCreationAttributes<ArticleLike>
> {
    declare id: CreationOptional<number>;
 
    declare created_at: CreationOptional<number>;
    declare created_by: number;
};

export class ArticleDislike extends Model<
    InferAttributes<ArticleDislike>,
    InferCreationAttributes<ArticleDislike>
> {
    declare id: CreationOptional<number>;
 
    declare created_at: CreationOptional<number>;
    declare created_by: number;
};

export class ArticleShare extends Model<
    InferAttributes<ArticleShare>,
    InferCreationAttributes<ArticleShare>
> {
    declare id: CreationOptional<number>;
 
    declare created_at: CreationOptional<number>;
    declare created_by: number;
};


export class Article extends Model<
    InferAttributes<Article>,
    InferCreationAttributes<Article>
> {
    declare id: CreationOptional<number>;
 
    declare created_at: CreationOptional<number>;
    declare created_by: number;
    declare updated_at: number | null;
    declare updated_by: number | null;
    declare deleted_at: number | null;
    declare deleted_by: number | null;
};


// Factory