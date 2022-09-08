# Paswords.

![Vercel deploy status](https://vercelbadge.vercel.app/api/larsniet/paswords)

This repository contains the code for a web-app running @ https://paswords.link/.

## ❓ What is Paswords?

Paswords is a web-app that allows you to generate passwords and share them with anyone you would like. It's main purpose is to safely share passwords with other people by using a one-time-link system. Simply fill in or generate the password you would like to share, set a timer for when the link should be invalidated and the link will be automatically generated. You can then share the link with anyone you would like and they will be able to see the password you have shared. Once the link is opened, it will be invalidated and can no longer be used.

## 🔨 Development

The main components from the application are build with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [DaisyUI](https://www.daisyui.com/) and [Firebase](https://firebase.google.com/). To get started, you can run the following commands:

```bash
git clone git@github.com:larsniet/paswords.git
cd paswords
yarn install
cp .env.example .env
```

To generate the secret key you can run various command to your own liking, here is two of them:

```bash
# Using node and crypto
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
# Or using openssl
openssl rand -hex 16
```

Make sure to create your own Firebase project and activate both Functions and Firestore and add the credentials to the `.env` file. If everything is set up correctly, you can then run the following command to start the development server:

```bash
yarn dev
```

## :seedling: We need your help!

This project is open-source for a reason. I want to make sure that the code is safe and secure. If you find any security issues, please open an issue or contact me directly. I am not a security expert, so I would appreciate any help I can get.
