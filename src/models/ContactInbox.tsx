import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
} from "sequelize";

export default function ContactInboxFactory(sequelize: Sequelize) {
    class ContactInbox extends Model<
        InferAttributes<ContactInbox>,
        InferCreationAttributes<ContactInbox>
    > {
        declare id: CreationOptional<number>;

        declare ip: string;
        declare hash: string;

        declare name: string;
        declare email: string | null;
        declare phone: string | null;
        declare company: string | null;
        declare message: string | null;

        declare unread: CreationOptional<boolean>;

        declare created_at: CreationOptional<Date>;
        declare updated_at: Date | null;
    }

    ContactInbox.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            ip: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            hash: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            email: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            phone: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            company: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            message: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            unread: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },

            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },

            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "contact_inboxs",
            timestamps: false,
            underscored: true,
        }
    );

    return ContactInbox;
}
