## Getting Started ⚙

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Environment Variables 🛠
The following are the environment variables required in your `.env` file
```js
//your email host
EMAIL_HOST="smtp.gmail.com"
//the email name you want to use 
EMAIL_NAME="name@gmail.com"
//the email password 
EMAIL_PASSWORD
//base url to your production or local project
NEXTAUTH_URL
//string used to hash cookies
NEXTAUTH_SECRET
//online mongodb connection string
MONGO_URL 
//local mongodb connection string
LOCAL_DB 
```

## Creating your own account 🚗
Please go to the `src/pages/auth/signup` file and replace my email address with yours

```js
  // Only allow myself to create an account
  if (email !== "dev.johnmwendwa@gmail.com") {
    return res.status(401).json({
      error: "Sorry, this is a personal project for now!",
    });
  }
```
## Congratulatory Emails 📩
I have added a new feature to send you an email with a congratulatory message upon completion of a book

- Changing the email subject name
  
    Go to `src/pages/api/books/update` and replace the subject field name with yours 
    ```js
         if (book.end !== null) {
            const message = randomCongratulationMessage(book.title);
            await sendEmail({
              to: process.env.EMAIL_NAME,
              subject: "Congratulations John 🎉",
              html: message,
            });
          }
    ```

-   Adding to or changing the congratulation message
  
Go to `src/lib/emails/congrats-message.ts` file and add or change the messages in the array to your own liking.

**Note :** If you don't like this new feature you can comment out the above code in your repo.And incase you don't know how to setup gmail for use with nodemailer, don't fail to send me an email at <a href="mailto:dev.johnmwendwa@gmail.com">dev.johnmwendwa@gmail.com</a>, for step by step walkthrough. 

## Deploy on Vercel 🚀

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## New Features 🆕
If you would like to see any additional feature added to this repo, you can do any of the following:
- Open an issue with the  hashtag #Feature
- Fork the repo and make improvements and then open a pull request
- Send an email requesting the feature
- Message me on whatsapp through the number on my [portfolo website](https://johnmwendwa.vercel.app)

## Congrats, that's it 😎
As you start or continue with your reading journey, I wish you all the luck.
