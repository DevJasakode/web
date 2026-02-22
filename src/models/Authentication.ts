import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
    NonAttribute,
} from "sequelize";
import { User } from "./User";

export class Authentication extends Model<
    InferAttributes<Authentication>,
    InferCreationAttributes<Authentication>
> {
    declare id: CreationOptional<number>;

    declare accept: string | null;
    declare accept_encoding: string | null;
    declare accept_language: string | null;
    declare connection: string | null;
    declare cookie: string | null;
    declare host: string | null;
    declare referer: string | null;

    declare sec_ch_ua: string | null;
    declare sec_ch_ua_mobile: string | null;
    declare sec_ch_ua_platform: string | null;
    declare sec_fetch_dest: string | null;
    declare sec_fetch_mode: string | null;
    declare sec_fetch_site: string | null;

    declare user_agent: string | null;

    declare x_forwarded_for: string | null;
    declare x_forwarded_host: string | null;
    declare x_forwarded_port: string | null;
    declare x_forwarded_proto: string | null;

    declare geo_status: "granted" | "denied" | "prompt" | "unsupported" | "error";
    declare geo_error: string | null;
    declare geo_accuracy: string | null;
    declare geo_latitude: string | null;
    declare geo_longitude: string | null;
    declare geo_timestamp: string | null;

    declare session: string;
    declare user_id: number | null;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;

    // 👇 ini yang kurang
    declare user?: NonAttribute<User>;
}

export default function AuthenticationFactory(sequelize: Sequelize) {

    Authentication.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            accept: { type: DataTypes.TEXT, allowNull: true },
            accept_encoding: { type: DataTypes.STRING, allowNull: true },
            accept_language: { type: DataTypes.STRING, allowNull: true },
            connection: { type: DataTypes.STRING, allowNull: true },
            cookie: { type: DataTypes.TEXT, allowNull: true },
            host: { type: DataTypes.STRING, allowNull: true },
            referer: { type: DataTypes.TEXT, allowNull: true },

            sec_ch_ua: { type: DataTypes.STRING, allowNull: true },
            sec_ch_ua_mobile: { type: DataTypes.STRING, allowNull: true },
            sec_ch_ua_platform: { type: DataTypes.STRING, allowNull: true },
            sec_fetch_dest: { type: DataTypes.STRING, allowNull: true },
            sec_fetch_mode: { type: DataTypes.STRING, allowNull: true },
            sec_fetch_site: { type: DataTypes.STRING, allowNull: true },

            user_agent: { type: DataTypes.TEXT, allowNull: true },

            x_forwarded_for: { type: DataTypes.STRING, allowNull: true },
            x_forwarded_host: { type: DataTypes.STRING, allowNull: true },
            x_forwarded_port: { type: DataTypes.STRING, allowNull: true },
            x_forwarded_proto: { type: DataTypes.STRING, allowNull: true },

            geo_status: {
                type: DataTypes.ENUM("granted", "denied", "prompt", "unsupported", "error"),
                allowNull: false,
            },
            geo_error: { type: DataTypes.TEXT, allowNull: true },
            geo_accuracy: { type: DataTypes.TEXT, allowNull: true },
            geo_latitude: { type: DataTypes.TEXT, allowNull: true },
            geo_longitude: { type: DataTypes.TEXT, allowNull: true },
            geo_timestamp: { type: DataTypes.TEXT, allowNull: true },

            session: { type: DataTypes.STRING, allowNull: false },
            user_id: { type: DataTypes.INTEGER, allowNull: true },

            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            tableName: "authentications",
            timestamps: false,
            underscored: true,
        }
    );

    Authentication.belongsTo(User, {
        foreignKey: "user_id",
        as: "user",
    });

    return Authentication;
};
