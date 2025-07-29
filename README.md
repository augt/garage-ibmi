This is a very simple front-end developed with Next.js to demonstrate the use of a web service built on AS400/IBM i. It allows a user to make HTTP requests to the API hosted on the AS400/IBM i.

## Getting Started

First, add the environment variables in a .env file, following the example in the .env.example file :
NEXT_PUBLIC_API_SCHEME=[http or https]
NEXT_PUBLIC_API_HOST=[IP adress and port of your API or domain name]

then, run the development server:

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
