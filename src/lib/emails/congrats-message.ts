export const randomCongratulationMessage = (title: string) => {
  const messages = [
    `<p>I'm so thrilled to see that you've reached your goal of finishing <b>${title}</b>. You inspire by having such ambitious dreams, then putting in the hard work to achieve them.</p> <p><b>“There is more treasure in books than in all the pirate's loot on Treasure Island.” ― Walt Disney</b></p>`,
    `Congratulations on finishing <b>${title}</b>! I always knew you could do it, and I'm incredibly proud of you.Keep up on building yourself.</p>`,
    `<p>I saw you work so hard every day to finish this book <b>${title}</b>, and I can't think of anyone who deserves it more. You set an amazing example for everyone around you.</p> <p><b>“Books are the mirrors of the soul.”― Virginia Woolf</b></p>`,
    `<p>I see you've just finished reading <b>${title}</b>.This amazing accomplishment is just one step on your journey. Your ability to relentlessly search for solutions to problems and find innovative ways to improve the world is the key to this success and many to come.And guess what, a better world starts by being a better <b>you</b>.<p><b>“Books are the plane, and the train, and the road. They are the destination, and the journey. They are home.” ― Anna Quindlen</b></p>`,
    `<p>Congratulations on completing <b>${title}</b>! This is an incredible milestone and you deserve the spotlight to celebrate the moment.Take a deep breathe and just take a moment to appreciate how amazing you're</p> .<p><b>“Today a reader, tomorrow a leader.” ― Margaret Fuller</b></p>`,
    `<p>Cheers to you for a job well done! No one can compare to your commitment and passion, and it's no surprise that you've become so disciplined and successfull.Starting and finishing <b>${title}</b> is not a small feet.Hold your head high for that is amazing.</p><p><b>“Reading is to the mind what exercise is to the body.” ― Joseph Addison</b></p>`,
  ];

  const idx = Math.floor(Math.random() * messages.length);

  return messages[idx];
};
