import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  Sequelize,
} from "sequelize";
import bcrypt from "bcryptjs";

function isBcryptHash(value: string): boolean {
  return /^\$2[aby]\$\d{2}\$/.test(value);
}

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare username: string;
  declare verified_email: Date | null;
  declare avatar: string | null;
  declare password: string;

  declare created_at: CreationOptional<Date>;
  declare created_by: number;

  declare updated_at: Date | null;
  declare updated_by: number | null;

  declare deleted_at: Date | null;
  declare deleted_by: number | null;
}

export default function UserFactory(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      verified_email: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      password: {
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
      tableName: "users",
      timestamps: false,
      underscored: true,
      hooks: {
        async beforeCreate(user: User) {
          if (user.password && !isBcryptHash(user.password)) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        async beforeUpdate(user: User) {
          if (user.changed("password") && user.password) {
            if (!isBcryptHash(user.password)) {
              user.password = await bcrypt.hash(user.password, 10);
            }
          }
        },
      },
    }
  );

  return User;
}
