import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
} from "sequelize";


export default function AboutTeamSocialMediaFactory(sequelize: Sequelize) {
    class AboutTeamSocialMedia extends Model<
        InferAttributes<AboutTeamSocialMedia>,
        InferCreationAttributes<AboutTeamSocialMedia>
    > {
        declare id: CreationOptional<number>;

        declare about_team_id: number;
        declare platform: string;
        declare platform_logo: string | null;
        declare platform_url: string | null;
        declare url: string;

        declare created_at: CreationOptional<Date>;
        declare created_by: number;

        declare updated_at: Date | null;
        declare updated_by: number | null;

        // field declarations ...

        static associate(models: any) {
            this.belongsTo(models.AboutTeam, {
                foreignKey: "about_team_id",
                as: "team",
            });
        }
    }

    AboutTeamSocialMedia.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            about_team_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            platform: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            platform_logo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            
            platform_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            url: {
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
        },
        {
            sequelize,
            tableName: "about_team_social_media",
            timestamps: false,
            underscored: true,
        }
    );

    return AboutTeamSocialMedia;
}
