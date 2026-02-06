import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
} from "sequelize";


export default function DocsFactory(sequelize: Sequelize) {
    class Docs extends Model<
        InferAttributes<Docs>,
        InferCreationAttributes<Docs>
    > {
        declare id: CreationOptional<number>;


        declare created_at: CreationOptional<Date>;
        declare created_by: number;

        declare updated_at: Date | null;
        declare updated_by: number | null;
        declare name: string;
        declare slug: string;
        declare logo: string | null;
        declare desc: string | null;

        declare deleted_at: Date | null;
        declare deleted_by: number | null;
    }

    Docs.init(
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
            logo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            desc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },

            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            updated_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            deleted_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "docs",
            timestamps: false,
            underscored: true,
        }
    );

    return Docs;
}
