import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    Sequelize,
} from 'sequelize';

export default function DtpKpuFactory(sequelize: Sequelize) {
    class Pemilih extends Model<
        InferAttributes<Pemilih>,
        InferCreationAttributes<Pemilih>
    > {
        declare id: CreationOptional<number>;

        declare id_prov: string | null;
        declare id_kota: string | null;
        declare id_kecamatan: string | null;
        declare id_kelurahan: string | null;

        declare provinsi: string | null;
        declare kabupaten: string | null;
        declare kecamatan: string | null;
        declare kelurahan: string | null;

        declare tps_id: string | null;
        declare no_kk: string | null;
        declare no_nik: string | null;

        declare nama: string | null;
        declare tempat_lahir: string | null;
        declare tanggal_lahir: string | null;
        declare usia: string | null;

        declare jns_kelamin: string | null;
        declare alamat: string | null;

        declare disabilitas: string | null;
        declare lup: string | null;

        declare created_at: CreationOptional<Date>;
        declare updated_at: CreationOptional<Date>;

        static associate(models: any) {
            // relasi kalau nanti ada
        }
    }

    Pemilih.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            id_prov: DataTypes.STRING,
            id_kota: DataTypes.STRING,
            id_kecamatan: DataTypes.STRING,
            id_kelurahan: DataTypes.STRING,

            provinsi: DataTypes.STRING,
            kabupaten: DataTypes.STRING,
            kecamatan: DataTypes.STRING,
            kelurahan: DataTypes.STRING,

            tps_id: DataTypes.STRING,
            no_kk: DataTypes.STRING,
            no_nik: DataTypes.STRING,

            nama: DataTypes.STRING,
            tempat_lahir: DataTypes.STRING,
            tanggal_lahir: DataTypes.STRING,
            usia: DataTypes.STRING,

            jns_kelamin: DataTypes.STRING,
            alamat: DataTypes.STRING,

            disabilitas: DataTypes.STRING,
            lup: DataTypes.STRING,

            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },

            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            tableName: 'dtp_kpus',
            timestamps: true,
            underscored: true, // ⬅️ WAJIB
        }
    );

    return Pemilih;
}