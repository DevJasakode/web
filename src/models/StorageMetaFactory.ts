import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
} from "sequelize";


export class StorageMeta extends Model<
    InferAttributes<StorageMeta>,
    InferCreationAttributes<StorageMeta>
> {
    declare id: CreationOptional<number>;
    declare storage_id: number;
    declare key: string;
    declare value: string | null;
    declare created_at: CreationOptional<Date>;
}

export default function StorageMetaFactory(sequelize: Sequelize) {
    StorageMeta.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            storage_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            tableName: "storage_meta",
            timestamps: false,
            underscored: true,
        }
    );

    return StorageMeta;
}