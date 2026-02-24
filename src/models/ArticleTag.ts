import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
} from "sequelize";


export class ArticleTag extends Model<
    InferAttributes<ArticleTag>,
    InferCreationAttributes<ArticleTag>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare slug: string;
    declare desc: string | null;

    declare created_at: CreationOptional<number>;
    declare created_by: number;

    declare updated_at: number | null;
    declare updated_by: number | null;

    declare deleted_at: number | null;
    declare deleted_by: number | null;
};

export default function ArticleTagFactory(sequelize: Sequelize) {
    ArticleTag.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            desc: {
                type: DataTypes.STRING,
                allowNull: true,

            },
            created_at: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            updated_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            deleted_at: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            deleted_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "article_tags",
            timestamps: false,
            underscored: true,
        }
    );
    
    return ArticleTag;
};