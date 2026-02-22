import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
} from "sequelize";

export default function StorageAccessTokenFactory(sequelize: Sequelize) {
    class StorageAccessToken extends Model<
        InferAttributes<StorageAccessToken>,
        InferCreationAttributes<StorageAccessToken>
    > {
        declare id: CreationOptional<number>;
        declare storage_id: number;
        declare value: string;
        declare expires_at: number;
        declare created_at: CreationOptional<number>;
    }

    StorageAccessToken.init(
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
            value: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            expires_at: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: sequelize.literal("(strftime('%s','now'))"),
            },
        },
        {
            sequelize,
            tableName: "storage_access_token",
            timestamps: false,
            underscored: true,
        }
    );

    return StorageAccessToken;
}