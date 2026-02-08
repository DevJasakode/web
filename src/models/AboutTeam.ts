import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
} from "sequelize";

export default function AboutTeamFactory(sequelize: Sequelize) {
    class AboutTeam extends Model<
        InferAttributes<AboutTeam>,
        InferCreationAttributes<AboutTeam>
    > {
        declare id: CreationOptional<number>;

        declare name: string;
        declare avatar: string | null;
        declare position: string;
        declare position_desc: string;
        declare profile: string | null;
        declare focus: string | null;

        declare created_at: CreationOptional<Date>;
        declare created_by: number;

        declare updated_at: Date | null;
        declare updated_by: number | null;

        declare deleted_at: Date | null;
        declare deleted_by: number | null;

        // field declarations ...

        static associate(models: any) {
            this.hasMany(models.AboutTeamSocialMedia, {
                foreignKey: "about_team_id",
                as: "social_media",
            });
        }
    }

    AboutTeam.init(
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

            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            position_desc: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            profile: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            focus: {
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
            tableName: "about_teams",
            timestamps: false,
            underscored: true,
        }
    );

    return AboutTeam;
}
