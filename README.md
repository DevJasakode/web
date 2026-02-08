This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Sequelize
Buat model + migration via CLI
```bash
npx sequelize-cli model:generate \
  --name User \
  --attributes email:string,password:string

npx sequelize-cli migration:generate --name create-users

```

Akan menghasilkan:
```bash
sequelize/models/user.js
sequelize/migrations/XXXXXXXX-create-user.js
```

### Edit migration (wajib rapikan)
sequelize/migrations/*-create-user.js
```js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
```


### Jalankan migrasi
```bash
npx sequelize-cli db:migrate
```

### Buat Seeder
```bash
npx sequelize-cli seed:generate --name demo-user
```

sequelize/seeders/*-demo-user.js
```js
"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [
      {
        email: "admin@example.com",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
```


### Jalanan Seeders
```bash
npx sequelize-cli db:seed:all
```


warsiniinsiyah@gmail.com
wawangmetu

PT. Jasa Inovasi Internasional
PT. Jasa Inovasi Holdings
PT. Agartha Inovasi Holdings


| Kode     | Bahasa                   |
| -------- | ------------------------ |
| eng      | English                  |
| spa      | Spanish                  |
| fra      | French                   |
| cat      | Catalan                  |
| por      | Portuguese               |
| ita      | Italian                  |
| glg      | Galician                 |
| eus      | Basque                   |
| oci      | Occitan                  |
| arg      | Aragonese                |
| ast      | Asturian                 |
| afr      | Afrikaans                |
| nld      | Dutch                    |
| swe      | Swedish                  |
| dan      | Danish                   |
| nob      | Norwegian Bokmål         |
| nno      | Norwegian Nynorsk        |
| isl      | Icelandic                |
| mkd      | Macedonian               |
| bul      | Bulgarian                |
| hbs      | Serbo-Croatian (generic) |
| hbs_HR   | Croatian                 |
| hbs_SR   | Serbian                  |
| hbs_BS   | Bosnian                  |
| slv      | Slovenian                |
| rus      | Russian                  |
| ukr      | Ukrainian                |
| bel      | Belarusian               |
| pol      | Polish                   |
| szl      | Silesian                 |
| hin      | Hindi                    |
| urd      | Urdu                     |
| ind      | Indonesian               |
| zlm      | Malay                    |
| epo      | Esperanto                |
| srd      | Sardinian                |
| bre      | Breton                   |
| frp      | Franco-Provençal         |
| oci_aran | Aranese Occitan          |



| Kode    | Bahasa                 |
| ------- | ---------------------- |
| ar      | Arab                   |
| az      | Azeri / Azerbaijani    |
| bg      | Bulgaria               |
| bn      | Bengali                |
| ca      | Catalan                |
| cs      | Ceko                   |
| da      | Denmark                |
| de      | Jerman                 |
| el      | Yunani                 |
| en      | Inggris                |
| eo      | Esperanto              |
| es      | Spanyol                |
| et      | Estonia                |
| eu      | Basque                 |
| fa      | Persia (Farsi)         |
| fi      | Finlandia              |
| fr      | Prancis                |
| ga      | Irlandia               |
| gl      | Galisia                |
| he      | Ibrani                 |
| hi      | Hindi                  |
| hu      | Hungaria               |
| id      | Indonesia              |
| it      | Italia                 |
| ja      | Jepang                 |
| ko      | Korea                  |
| ky      | Kirgiz                 |
| lt      | Lituania               |
| lv      | Latvia                 |
| ms      | Melayu                 |
| nb      | Norwegia Bokmål        |
| nl      | Belanda                |
| pl      | Polandia               |
| pt      | Portugis               |
| pt-BR   | Portugis (Brasil)      |
| ro      | Rumania                |
| ru      | Rusia                  |
| sk      | Slovakia               |
| sl      | Slovenia               |
| sq      | Albania                |
| sv      | Swedia                 |
| th      | Thai                   |
| tl      | Tagalog                |
| tr      | Turki                  |
| uk      | Ukraina                |
| ur      | Urdu                   |
| vi      | Vietnam                |
| zh-Hans | Mandarin (Sederhana)   |
| zh-Hant | Mandarin (Tradisional) |



npx sequelize-cli migration:generate --name create-about-team-social-media
npx sequelize-cli seed:generate --name about-team