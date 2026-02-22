import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
    NonAttribute,
} from "sequelize";
import type { StorageMeta } from "./StorageMetaFactory";

export class Storage extends Model<
    InferAttributes<Storage>,
    InferCreationAttributes<Storage>
> {
    declare id: CreationOptional<number>;
    declare private: CreationOptional<boolean>;
    declare prefix: string;
    declare name: string;
    declare hash: string;
    declare size: number;
    declare content_type: string;

    declare created_at: CreationOptional<Date>;
    declare created_by: number;

    declare updated_at: Date | null;
    declare updated_by: number | null;

    declare deleted_at: Date | null;
    declare deleted_by: number | null;

    // relasi
    declare meta?: NonAttribute<StorageMeta[]>;
}

export default function StorageFactory(sequelize: Sequelize) {

    Storage.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            private: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            prefix: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "/storage",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            content_type: {
                type: DataTypes.STRING,
                allowNull: false,
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
            tableName: "storages",
            timestamps: false,
            underscored: true,
        }
    );

    return Storage;
};