# Creating empty next-app project from scratch
npx create-next-app pronounce_fend
cd pronounce_fend

# Installing extra libs
npm install @material-ui/core
npm install @material-ui/icons
yarn add --dev typescript @types/node

# Installing, once package.json created
yarn install
npm build

## Running the app
yarn run dev
npm run dev


# Deployment (Vercel)

Just sign up with github account and deploy this repo
The page will keep updated align with changes on the master branch

## online frontend page
https://pronounce-fend.vercel.app/


# Sources

Deploying next app on vercel
https://www.youtube.com/watch?v=_8wkKL0LKks
