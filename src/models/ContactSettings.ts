import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
} from "sequelize";

export default function ContactSettingFactory(sequelize: Sequelize) {
    class ContactSetting extends Model<
        InferAttributes<ContactSetting>,
        InferCreationAttributes<ContactSetting>
    > {
        declare id: CreationOptional<number>;

        declare address: string;
        declare phone: string;
        declare email: string;

        declare auto_reply_email: boolean;
        declare auto_reply_email_message: string;

        declare forward_telegram_bot: boolean;
        declare forward_telegram_bot_token: string | null;

        declare forward_whatsapp: boolean;
        declare forward_whatsapp_contact: string | null;

        declare created_at: CreationOptional<Date>;
        declare created_by: number;

        declare updated_at: Date | null;
        declare updated_by: number | null;

        static associate(models: any) {
            // Kalau nanti ingin relasi ke user:
            // this.belongsTo(models.User, {
            //   foreignKey: "created_by",
            //   as: "creator",
            // });
        }
    }

    ContactSetting.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            auto_reply_email: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },

            auto_reply_email_message: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            forward_telegram_bot: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },

            forward_telegram_bot_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            forward_whatsapp: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },

            forward_whatsapp_contact: {
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
        },
        {
            sequelize,
            tableName: "contact_settings",
            timestamps: false,
            underscored: true,
        }
    );

    return ContactSetting;
}
