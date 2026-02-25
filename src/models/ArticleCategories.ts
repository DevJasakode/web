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

export class ArticleCategories extends Model<
    InferAttributes<ArticleCategories>,
    InferCreationAttributes<ArticleCategories>
> {
    declare id: CreationOptional<number>;
    declare logo: CreationOptional<string | null>;
    declare slug: string;
    declare parent_id: ForeignKey<ArticleCategories["id"]> | null;
    declare name: string;

    declare created_at: CreationOptional<number>;
    declare created_by: number;

    declare updated_at: number | null;
    declare updated_by: number | null;

    declare deleted_at: number | null;
    declare deleted_by: number | null;

    // relasi
    declare children?: NonAttribute<ArticleCategories[]>;
    declare parent?: NonAttribute<ArticleCategories>;
};


export default function ArticleCategoriesFactory(sequelize: Sequelize) {
    ArticleCategories.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            logo: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            parent_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            created_at: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: Sequelize.literal("(strftime('%s','now'))"),
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
            tableName: "article_categories",
            timestamps: false,
            underscored: true,
        }
    );

    // self-relation
    ArticleCategories.hasMany(ArticleCategories, {
        as: "children",
        foreignKey: "parent_id",
    });

    ArticleCategories.belongsTo(ArticleCategories, {
        as: "parent",
        foreignKey: "parent_id",
    });

    return ArticleCategories;
}